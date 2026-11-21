export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  confirmPassword: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
}
