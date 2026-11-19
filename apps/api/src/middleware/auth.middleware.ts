import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { env } from "../config/env.js";
import User from "../models/User.js";

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies?.[env.AUTH_COOKIE_NAME];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (
      !decoded.sub ||
      typeof decoded.sub !== "string" ||
      typeof decoded.tokenVersion !== "number"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
      return;
    }

    // Verify the account still exists and the token
    // belongs to the current session version.
    const user = await User.findById(decoded.sub)
      .select("+tokenVersion")
      .lean();

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      res.status(401).json({
        success: false,
        message: "Your session is no longer valid. Please log in again.",
      });
      return;
    }

    req.auth = {
      userId: String(user._id),
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again.",
    });
  }
};
