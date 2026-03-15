import mongoose, { Schema } from "mongoose";
const CustomerSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    skinType: { type: String },
    purchases: { type: Number, default: 0 },
    lastVisit: { type: String },
    allergies: { type: [String], default: [] }
}, { timestamps: true });
export default mongoose.model("Customer", CustomerSchema);
