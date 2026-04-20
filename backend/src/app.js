const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Optional dependencies — gracefully degrade if not installed
let rateLimit;
try {
  rateLimit = require("express-rate-limit");
} catch {
  console.warn("[WARN] express-rate-limit not installed. Skipping rate limiting.");
}

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Global Request Logger — prints EVERY incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Ensure DB is connected before handling any request (critical for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("[DB Middleware] Failed to connect:", err.message);
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

// Apply rate limiter only if available
if (rateLimit) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      message: "Too many requests from this IP, please try again after 15 minutes",
    },
  });
  app.use("/api", limiter);
}

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Global Error Handler — catches any unhandled errors in the pipeline
app.use((err, req, res, next) => {
  console.error("[Unhandled Error]", err.stack || err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Export app for serverless platforms like Vercel
module.exports = app;

// Start server locally if not in production/serverless
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n${signal} signal received. Closing HTTP server...`);

    server.close(async () => {
      console.log("HTTP server closed.");
      try {
        await mongoose.connection.close(false);
        console.log("MongoDB connection closed gracefully.");
        process.exit(0);
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });

    // Force close after 10s if connections are hanging
    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down",
      );
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
