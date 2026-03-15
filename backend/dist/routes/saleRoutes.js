import express from "express";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: (err instanceof Error ? err.message : "Server error") });
    }
});
router.post("/", async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;
        if (!customerId || !productId || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        if (product.stock < quantity)
            return res.status(400).json({ message: "Insufficient stock" });
        const price = product.price;
        if (price === undefined)
            return res.status(400).json({ message: "Product price missing" });
        const total = price * quantity;
        const sale = new Sale({
            customerId,
            productId,
            quantity,
            price,
            total,
        });
        await sale.save();
        product.stock -= quantity;
        await product.save();
        console.log("SALE CREATED =>", sale);
        res.status(201).json(sale);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: (err instanceof Error ? err.message : "Server error") });
    }
});
export default router;
