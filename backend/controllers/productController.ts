import { Request, Response } from "express";
import Product from "../models/Product.js";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: (err as Error).message });
  }
};


export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Failed to add product", error: (err as Error).message });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product", error: (err as Error).message });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete product", error: (err as Error).message });
  }
};


export const lowStockProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ stock: { $lt: 15 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: (err as Error).message });
  }
};
