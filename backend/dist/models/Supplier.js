import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    productsSupplied: { type: String, required: true },
    notes: { type: String },
    lastRestockDate: { type: Date },
}, { timestamps: true });
// Compound index for name + contactPerson
supplierSchema.index({ name: 1, contactPerson: 1 }, { unique: true });
const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
