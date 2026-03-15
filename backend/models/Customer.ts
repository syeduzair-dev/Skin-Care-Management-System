import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  phone?: string;
  email?: string;
  skinType?: string;
  purchases: number;
  lastVisit?: string;
  allergies: string[];
}

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    skinType: { type: String },
    purchases: { type: Number, default: 0 },
    lastVisit: { type: String },
    allergies: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
