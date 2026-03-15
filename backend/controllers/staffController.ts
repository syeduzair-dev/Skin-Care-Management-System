import { Request, Response } from "express";
import Staff from "../models/Staff.js";


export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const addStaff = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    
    const existing = await Staff.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newStaff = new Staff({ name, email, password, role });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

  
    const duplicate = await Staff.findOne({ email, _id: { $ne: id } });
    if (duplicate) return res.status(400).json({ message: "Email already exists" });

    staff.name = name;
    staff.email = email;
    staff.role = role;
    if (password) staff.password = password; 

    await staff.save();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
