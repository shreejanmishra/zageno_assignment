const mongoose = require("mongoose");

let cached = global._mongooseConnection;
if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  // Already connected — reuse
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  // If a connection attempt is already in-flight, await it
  if (!cached.promise) {
    console.log("[DB] Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((m) => {
        console.log(`[DB] MongoDB connected: ${m.connection.host}`);
        return m;
      })
      .catch((err) => {
        // Reset so the next request retries
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
