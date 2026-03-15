import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import salesRoutes from "./routes/saleRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import alertRoutes from "./routes/alertRoute.js"; // ← Add this
dotenv.config();
connectDB();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// API Routes (must be BEFORE React static fallback)
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
// Test API route
app.get("/api/test", (req, res) => {
    res.json({ message: "API working" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
