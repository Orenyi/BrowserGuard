import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import csrfRoutes from "./routes/csrf.routes.js";

import { doubleCsrfProtection } from "./middleware/csrf.middleware.js";

import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

import type { Request, Response, NextFunction } from "express";

const app = express();

const trustedOrigin = new URL(env.CLIENT_URL).origin;

const safeMethods = ["GET", "HEAD", "OPTIONS"];

/**
 * Reject state-changing requests from untrusted browser origins.
 */
const validateRequestOrigin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (safeMethods.includes(req.method.toUpperCase())) {
    return next();
  }

  // Additional browser Fetch Metadata protection.
  const fetchSite = req.get("sec-fetch-site");

  if (fetchSite === "cross-site") {
    return res.status(403).json({
      success: false,
      message: "Cross-site requests are not allowed.",
    });
  }

  const origin = req.get("origin");
  const referer = req.get("referer");

  // Browsers normally provide Origin for state-changing requests.
  // Referer is used as a fallback when Origin is absent.
  const requestOrigin = origin || referer;

  // Non-browser clients such as Postman may not send either header.
  // They must still pass CSRF token validation.
  if (!requestOrigin) {
    return next();
  }

  try {
    const parsedOrigin = new URL(requestOrigin).origin;

    if (parsedOrigin !== trustedOrigin) {
      return res.status(403).json({
        success: false,
        message: "Request origin is not allowed.",
      });
    }
  } catch {
    return res.status(403).json({
      success: false,
      message: "Invalid request origin.",
    });
  }

  next();
};

//
// 1. Security headers
//
app.use(helmet());

//
// 2. CORS configuration
//
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-CSRF-Token"],
  }),
);

//
// 3. Request body parsing
//
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

//
// 4. Cookie parser
//
app.use(cookieParser());

//
// 5. Global API rate limiting
//
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

//
// 6. Root endpoint
//
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to BrowserGuard API",
  });
});

//
// 7. CSRF token endpoint
// This must be registered BEFORE global CSRF protection.
//
app.use("/api/v1/csrf", csrfRoutes);

//
// 8. Validate origins and protect state-changing API requests.
//
app.use("/api", validateRequestOrigin);
app.use("/api", doubleCsrfProtection);

//
// 9. Health routes
//
app.use("/api/v1/health", healthRoutes);

//
// 10. Authentication routes
//
app.use("/api/v1/auth", authRoutes);

//
// 11. Handle unknown routes
//
app.use(notFoundHandler);

//
// 12. Global error handler
//
app.use(errorHandler);

export default app;
