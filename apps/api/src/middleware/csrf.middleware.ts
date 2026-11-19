import { randomBytes } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { doubleCsrf } from "csrf-csrf";

import { env } from "../config/env.js";

const CSRF_SESSION_COOKIE =
  env.NODE_ENV === "production"
    ? "__Host-browserguard_csrf_session"
    : "browserguard_csrf_session";

type CsrfRequest = Request & {
  csrfSessionId?: string;
};

const csrfSessionCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => env.CSRF_SECRET,

  getSessionIdentifier: (req: Request) => {
    const csrfReq = req as CsrfRequest;

    const sessionId =
      csrfReq.csrfSessionId ?? req.cookies?.[CSRF_SESSION_COOKIE];

    if (!sessionId) {
      throw new Error("CSRF session identifier is missing.");
    }

    return sessionId;
  },

  cookieName:
    env.NODE_ENV === "production"
      ? "__Host-browserguard_csrf_token"
      : "browserguard_csrf_token",

  cookieOptions: {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  },

  ignoredMethods: ["GET", "HEAD", "OPTIONS"],

  getCsrfTokenFromRequest: (req: Request) => {
    const token = req.headers["x-csrf-token"];

    return Array.isArray(token) ? token[0] : token;
  },
});

/**
 * Ensures every browser has a stable CSRF session identifier.
 */
export const ensureCsrfSession = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const csrfReq = req as CsrfRequest;

  let sessionId = req.cookies?.[CSRF_SESSION_COOKIE];

  if (!sessionId) {
    sessionId = randomBytes(32).toString("hex");

    res.cookie(CSRF_SESSION_COOKIE, sessionId, csrfSessionCookieOptions);
  }

  // Make the identifier available during this same request.
  csrfReq.csrfSessionId = sessionId;

  next();
};

/**
 * Generates a CSRF token for the current browser session.
 */
export const issueCsrfToken = (req: Request, res: Response) => {
  const token = generateCsrfToken(req, res);

  res.status(200).json({
    success: true,
    message: "CSRF token generated successfully.",
    data: {
      csrfToken: token,
    },
  });
};

export { doubleCsrfProtection };
