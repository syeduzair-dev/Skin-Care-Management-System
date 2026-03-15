import express from "express";
import { sendLowStockAlert } from "../controllers/alertController.js";
const router = express.Router();
router.post("/low-stock-email", sendLowStockAlert);
export default router;
