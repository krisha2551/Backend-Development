import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1");
    return connection;
  } catch (error) {
    throw new Error(error);
  }
}

export default connectDB;
