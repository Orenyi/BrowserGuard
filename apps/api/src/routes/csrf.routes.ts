import { Router } from "express";

import {
  ensureCsrfSession,
  issueCsrfToken,
} from "../middleware/csrf.middleware.js";

const router = Router();

/**
 * GET /api/v1/csrf/token
 * Creates a browser CSRF session if necessary
 * and issues a CSRF token.
 */
router.get("/token", ensureCsrfSession, issueCsrfToken);

export default router;
