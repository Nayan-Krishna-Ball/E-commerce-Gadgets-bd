//

import mongoose from "mongoose";

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

export async function connectDB() {
  try {
    const conn = await mongoose.connect(String(MONGODB_CONNECTION_STRING));
    // console.log("Database connected");

    return conn;
  } catch (err) {
    console.error(err);
  }
}
