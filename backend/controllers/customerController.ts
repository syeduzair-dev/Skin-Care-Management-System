import Customer from "../models/Customer.js";
import type { ICustomer } from "../models/Customer.js";
import type { Request, Response } from "express";


export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


export const addCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer: ICustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
