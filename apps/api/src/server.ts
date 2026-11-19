import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB before starting the API
    await connectDatabase();

    // Start Express server
    const server = app.listen(env.PORT, () => {
      console.log(`
========================================
       BROWSERGUARD API SERVER
========================================
  Environment: ${env.NODE_ENV}
  Port:        ${env.PORT}
  Status:      Running
  URL:         http://localhost:${env.PORT}
========================================
      `);
    });

    // Handle server errors
    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start BrowserGuard:", error);
    process.exit(1);
  }
};

startServer();
