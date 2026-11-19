
import mongoose from "mongoose";
import type { RequestHandler } from "express";

export const getHealth: RequestHandler = (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    message: databaseConnected
      ? "BrowserGuard API is healthy"
      : "Database connection unavailable",
    data: {
      service: "browserguard-api",
      api: "running",
      database: databaseConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    },
  });
};
