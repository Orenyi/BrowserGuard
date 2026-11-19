import mongoose from "mongoose";
import { setServers } from "node:dns";
import { env } from "./env.js";

// Fix MongoDB Atlas DNS SRV resolution
setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Atlas connected successfully");
    console.log(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
