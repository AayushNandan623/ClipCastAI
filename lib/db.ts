import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Please define mongo_uri in env variables");
}
// this global variable stores the connection to DB if it already exists
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // if connection already exists return it
  if (cached.conn) {
    return cached.conn;
  }
  // if no promise for creating a connection then create one using mongoose connect function
  if (!cached.promise) {
    // generally used in paid plans of mongoDb
    const options = {
      bufferCommands: true,
      maxPoolSize: 2, //number of connection pools
    };
    mongoose.connect(MONGODB_URI, options).then(() => mongoose.connection);
  }
  try {
    // if promise present await for it to get resolved and return the connection else make the cache promise as mull and throw error
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
