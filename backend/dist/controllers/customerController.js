import Customer from "../models/Customer.js";
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const addCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCustomer);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: "Customer deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
