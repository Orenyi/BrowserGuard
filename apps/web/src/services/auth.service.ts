import { apiRequest } from "./api";

import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from "../types/auth.types";

/**
 * Extracts the authenticated user from an API response.
 */
const getAuthenticatedUser = (response: {
  success: boolean;
  data?: AuthResponse;
}): AuthUser => {
  const user = response.data?.user;

  if (!response.success || !user) {
    throw new Error("Authentication failed. Please try again.");
  }

  return user;
};

/**
 * Authenticate an existing BrowserGuard user.
 */
export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthUser> => {
  const response = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: credentials,
  });

  return getAuthenticatedUser(response);
};

/**
 * Register a new BrowserGuard user.
 */
export const registerUser = async (
  credentials: RegisterCredentials,
): Promise<AuthUser> => {
  const response = await apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: credentials,
  });

  return getAuthenticatedUser(response);
};

export const requestPasswordReset = async (
  credentials: ForgotPasswordCredentials,
): Promise<void> => {
  await apiRequest("/auth/forgot-password", {
    method: "POST",
    body: credentials,
  });
};

export const resetUserPassword = async (
  credentials: ResetPasswordCredentials,
): Promise<void> => {
  await apiRequest("/auth/reset-password", {
    method: "POST",
    body: credentials,
  });
};

export const logoutUser = async (): Promise<void> => {
  await apiRequest("/auth/logout", {
    method: "POST",
  });
};
