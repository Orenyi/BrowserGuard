import type { ErrorRequestHandler } from "express";

type ApiError = Error & {
  statusCode?: number;
  code?: string;
};

export const errorHandler: ErrorRequestHandler = (
  error: ApiError,
  _req,
  res,
  _next,
) => {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? "Internal server error" : error.message,
    ...(error.code ? { code: error.code } : {}),
  });
};
