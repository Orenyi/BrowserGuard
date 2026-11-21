import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { apiRequest } from "../services/api";
import { logoutUser } from "../services/auth.service";

import type { AuthResponse, AuthUser } from "../types/auth.types";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Retrieves the currently authenticated user
   * using the HTTP-only authentication cookie.
   */
  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const response = await apiRequest<AuthResponse>("/auth/me");

      const currentUser = response.data?.user;

      if (!response.success || !currentUser) {
        setUser(null);
        return null;
      }

      setUser(currentUser);

      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  /**
   * Restores the user's session when the application loads.
   */
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const response = await apiRequest<AuthResponse>("/auth/me");

        if (!isMounted) return;

        const currentUser = response.data?.user;

        setUser(response.success && currentUser ? currentUser : null);
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Logs out the user through the backend.
   * The backend clears the HTTP-only authentication cookie.
   */
  const logout = useCallback(async (): Promise<void> => {
    await logoutUser();

    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    setUser,
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
