import type { Response } from "express";
import { env } from "../config/env.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const setAuthCookie = (
  res: Response,
  token: string,
  maxAge: number,
): void => {
  res.cookie(env.AUTH_COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge,
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(env.AUTH_COOKIE_NAME, cookieOptions);
};
