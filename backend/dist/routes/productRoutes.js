import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct, lowStockProducts } from "../controllers/productController.js";
const router = express.Router();
router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/low-stock", lowStockProducts);
export default router;
