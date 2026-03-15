import express from "express";
import { sendReorderEmail } from "../controllers/reorderController";

const router = express.Router();

router.post("/reorder", sendReorderEmail);

export default router;
