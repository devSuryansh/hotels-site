import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-uri-here";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Extend global object to avoid TypeScript errors
declare global {
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

// Use global cache for hot reload prevention
let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  global.mongoose = cached; // Store in global cache
  return cached.conn;
}

export default dbConnect;
