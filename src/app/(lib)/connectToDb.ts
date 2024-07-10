import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDb() {
  console.log('attempting to connect to mongo');
    if (cached.conn) {
        return cached.conn;
      }
      if (!cached.promise) {
        const opts = {
          bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
          console.log('MongoDB connected');
          return mongoose;
        }).catch((err) => {
          console.error('MongoDB connection error:', err);
          throw err;
        });
      }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// export default connectToDb;