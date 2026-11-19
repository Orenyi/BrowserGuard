import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { randomBytes, createHash } from "node:crypto";

import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

import { env } from "../config/env.js";
import { sendPasswordResetEmail } from "./email.service.js";

// Password hashing configuration
const SALT_ROUNDS = 12;

// Session durations
const SESSION_DURATION = {
  normal: 24 * 60 * 60 * 1000,
  rememberMe: 7 * 24 * 60 * 60 * 1000,
};

// Password reset token expiry: 30 minutes
const RESET_TOKEN_EXPIRY = 30 * 60 * 1000;

// Authentication service errors
export class AuthServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

// Safe user response
export interface AuthUserResponse {
  id: string;
  displayName: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}

// Authentication response
export interface AuthResponse {
  user: AuthUserResponse;
  token: string;
  maxAge: number;
}

// Registration input
export interface RegisterInput {
  displayName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

// Login input
export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Format user response
const formatUser = (user: {
  _id: unknown;
  displayName: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}): AuthUserResponse => ({
  id: String(user._id),
  displayName: user.displayName,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

// Password validation
const validatePassword = (password: string): void => {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    throw new AuthServiceError(
      "Password must contain at least 8 characters, including uppercase, lowercase, a number and a special character.",
      400,
    );
  }
};

// Generate JWT
const generateToken = (
  userId: string,
  tokenVersion: number,
  rememberMe = false,
): string => {
  const expiresIn = rememberMe
    ? env.JWT_REMEMBER_ME_EXPIRES_IN
    : env.JWT_EXPIRES_IN;

  return jwt.sign(
    {
      sub: userId,
      tokenVersion,
    },
    env.JWT_SECRET,
    {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    },
  );
};

// Hash password reset token
const hashResetToken = (token: string): string => {
  return createHash("sha256").update(token).digest("hex");
};

// REGISTER USER
export const registerUser = async (
  input: RegisterInput,
): Promise<AuthResponse> => {
  const displayName = input.displayName.trim();
  const email = input.email.trim().toLowerCase();

  if (!displayName || displayName.length < 2) {
    throw new AuthServiceError("Please provide a valid full name.", 400);
  }

  if (!email) {
    throw new AuthServiceError("Email address is required.", 400);
  }

  validatePassword(input.password);

  if (input.acceptedTerms !== true) {
    throw new AuthServiceError(
      "You must accept the Terms of Service and Privacy Policy.",
      400,
    );
  }

  // Check whether the email already exists
  const existingUser = await User.findOne({ email }).select("_id").lean();

  if (existingUser) {
    throw new AuthServiceError(
      "An account with this email already exists.",
      409,
    );
  }

  // Hash password before saving
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  try {
    const user = await User.create({
      displayName,
      email,
      passwordHash,

      // Never accept role from public registration input
      role: "user",

      acceptedTermsAt: new Date(),

      // Initial JWT session version
      tokenVersion: 0,
    });

    const token = generateToken(String(user._id), user.tokenVersion ?? 0);

    return {
      user: formatUser(user),
      token,
      maxAge: SESSION_DURATION.normal,
    };
  } catch (error: unknown) {
    // Handle duplicate email race conditions
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new AuthServiceError(
        "An account with this email already exists.",
        409,
      );
    }

    throw error;
  }
};

// LOGIN USER
export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const email = input.email.trim().toLowerCase();

  if (!email || !input.password) {
    throw new AuthServiceError("Email and password are required.", 400);
  }

  // Explicitly retrieve passwordHash and tokenVersion
  const user = await User.findOne({ email }).select(
    "+passwordHash +tokenVersion",
  );

  if (!user) {
    throw new AuthServiceError("Invalid email or password.", 401);
  }

  // Verify submitted password
  const passwordMatches = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new AuthServiceError("Invalid email or password.", 401);
  }

  // Generate session based on Remember me
  const rememberMe = input.rememberMe === true;

  const token = generateToken(
    String(user._id),
    user.tokenVersion ?? 0,
    rememberMe,
  );

  return {
    user: formatUser(user),
    token,
    maxAge: rememberMe ? SESSION_DURATION.rememberMe : SESSION_DURATION.normal,
  };
};

// FORGOT PASSWORD
export const forgotPassword = async (emailInput: string): Promise<void> => {
  const email = emailInput.trim().toLowerCase();

  // Find account
  const user = await User.findOne({ email });

  // Avoid revealing whether an account exists
  if (!user) {
    return;
  }

  const now = new Date();

  // Invalidate previous unused reset tokens
  await PasswordResetToken.updateMany(
    {
      userId: user._id,
      usedAt: null,
    },
    {
      $set: {
        usedAt: now,
      },
    },
  );

  // Generate secure random token
  const rawToken = randomBytes(32).toString("hex");

  // Store only the SHA-256 hash
  const tokenHash = hashResetToken(rawToken);

  const expiresAt = new Date(now.getTime() + RESET_TOKEN_EXPIRY);

  const resetRecord = await PasswordResetToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
    usedAt: null,
  });

  // Build frontend reset URL
  const resetUrl = new URL("/reset-password", env.CLIENT_URL);

  resetUrl.searchParams.set("token", rawToken);

  try {
    // Send reset email
    await sendPasswordResetEmail({
      email: user.email,
      displayName: user.displayName,
      resetUrl: resetUrl.toString(),
    });
  } catch {
    // Remove token if email delivery fails
    await PasswordResetToken.deleteOne({
      _id: resetRecord._id,
    });

    // Never log reset tokens or reset URLs
    console.error("BrowserGuard password reset email delivery failed.");
  }
};

// RESET PASSWORD
export const resetPassword = async (
  rawToken: string,
  newPassword: string,
): Promise<void> => {
  // Validate reset token format
  if (!/^[a-f0-9]{64}$/.test(rawToken)) {
    throw new AuthServiceError("Invalid or expired password reset link.", 400);
  }

  // Validate new password
  validatePassword(newPassword);

  // Hash token for database lookup
  const tokenHash = hashResetToken(rawToken);

  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  // Start MongoDB transaction
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const now = new Date();

      // Atomically claim an unused, unexpired token
      const resetRecord = await PasswordResetToken.findOneAndUpdate(
        {
          tokenHash,
          usedAt: null,
          expiresAt: {
            $gt: now,
          },
        },
        {
          $set: {
            usedAt: now,
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!resetRecord) {
        throw new AuthServiceError(
          "Invalid or expired password reset link.",
          400,
        );
      }

      // Update password and invalidate existing sessions
      const updatedUser = await User.findByIdAndUpdate(
        resetRecord.userId,
        {
          $set: {
            passwordHash,
          },
          $inc: {
            tokenVersion: 1,
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatedUser) {
        throw new AuthServiceError(
          "Unable to reset password. Please try again.",
          400,
        );
      }

      // Invalidate all other outstanding reset tokens
      await PasswordResetToken.updateMany(
        {
          userId: resetRecord.userId,
          _id: {
            $ne: resetRecord._id,
          },
          usedAt: null,
        },
        {
          $set: {
            usedAt: now,
          },
        },
        {
          session,
        },
      );
    });
  } finally {
    await session.endSession();
  }
};
