import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined in .env");
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err: any) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB not connected
  }
};

export default connectDB;
