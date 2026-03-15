import { Request, Response } from "express";
import Supplier from "../models/Supplier.js";


export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching suppliers" });
  }
};


export const addSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = new Supplier(req.body);
    const savedSupplier = await supplier.save();
    res.status(201).json(savedSupplier);
  } catch (err) {
    res.status(400).json({ message: "Failed to add supplier", error: (err as Error).message });
  }
};


export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: "Failed to update supplier" });
  }
};


export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete supplier" });
  }
};
