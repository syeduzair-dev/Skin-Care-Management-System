import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const StaffSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "product_manager", "sales"], default: "sales" },
}, { timestamps: true });
// Hash password before saving
StaffSchema.pre("save", async function (next) {
    const staff = this;
    if (!staff.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    staff.password = await bcrypt.hash(staff.password, salt);
    next();
});
// Compare password
StaffSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
export default mongoose.model("Staff", StaffSchema);
