import express from "express";
import {
  getAllStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", addStaff);        
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff)

export default router;
