import express from "express";
import Supplier from "../models/Supplier.js";
import { sendEmail } from "../utils/sendEmail.js";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/", async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        res.status(201).json(supplier);
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Duplicate supplier detected" });
        }
        res.status(500).json({ message: err.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedSupplier)
            return res.status(404).json({ message: "Supplier not found" });
        res.json(updatedSupplier);
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Duplicate supplier detected" });
        }
        res.status(500).json({ message: err.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/reorder", async (req, res) => {
    const { email, supplierName, items } = req.body;
    if (!email || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Missing required fields or items" });
    }
    try {
        const emailBody = `Hello ${supplierName},

We would like to place a reorder for the following products:

${items.map((i) => `- ${i}`).join("\n")}

Regards,
Skin care `;
        await sendEmail(email, "Product Reorder Request", emailBody);
        res.json({ success: true, message: "Reorder email sent successfully" });
    }
    catch (error) {
        console.error("EMAIL ERROR:", error);
        res.status(500).json({ success: false, message: "Email sending failed" });
    }
});
export default router;
