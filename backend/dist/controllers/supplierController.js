import Supplier from "../models/Supplier.js";
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching suppliers" });
    }
};
export const addSupplier = async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        const savedSupplier = await supplier.save();
        res.status(201).json(savedSupplier);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to add supplier", error: err.message });
    }
};
export const updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSupplier);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to update supplier" });
    }
};
export const deleteSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted" });
    }
    catch (err) {
        res.status(400).json({ message: "Failed to delete supplier" });
    }
};
