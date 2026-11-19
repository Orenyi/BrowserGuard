import type { RequestHandler } from "express";

import {
  registerUser,
  loginUser,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
} from "../services/auth.service.js";

import User from "../models/User.js";

import { setAuthCookie, clearAuthCookie } from "../utils/authCookie.js";

// REGISTER
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { displayName, email, password, acceptTerms } = req.body;

    const result = await registerUser({
      displayName,
      email,
      password,
      acceptedTerms: acceptTerms,
    });

    // Set HTTP-only authentication cookie
    setAuthCookie(res, result.token, result.maxAge);

    res.status(201).json({
      success: true,
      message: "Your BrowserGuard account has been created successfully.",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    const result = await loginUser({
      email,
      password,
      rememberMe,
    });

    // Set HTTP-only authentication cookie
    setAuthCookie(res, result.token, result.maxAge);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logout: RequestHandler = (_req, res) => {
  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: "You have been logged out successfully.",
  });
};

// GET AUTHENTICATED USER
export const getCurrentUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
      return;
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User account no longer exists.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully.",
      data: {
        user: {
          id: String(user._id),
          displayName: user.displayName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// FORGOT PASSWORD
export const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    await forgotPasswordService(email);

    // Same response whether the account exists or not
    res.status(200).json({
      success: true,
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    await resetPasswordService(token, password);

    // Clear any existing authentication cookie
    clearAuthCookie(res);

    res.status(200).json({
      success: true,
      message:
        "Your password has been reset successfully. Please sign in with your new password.",
    });
  } catch (error) {
    next(error);
  }
};
