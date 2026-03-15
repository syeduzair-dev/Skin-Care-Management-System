import Staff from "../models/Staff.js";
import { sendEmail } from "../utils/sendEmail.js";
export const sendLowStockAlert = async (req, res) => {
    try {
        const products = req.body.products;
        if (!products || products.length === 0)
            return res.status(400).json({ message: "No products provided" });
        const staff = await Staff.find({ role: { $in: ["admin", "product_manager", "sales"] } }).select("email");
        const emails = staff.map(s => s.email);
        if (!emails.length)
            return res.status(400).json({ message: "No staff emails found" });
        const productLines = products.map((p) => `• ${p.name} (${p.brand}) - Only ${p.stock} left`).join("\n");
        const subject = "🚨 Low Stock Alert - Action Required";
        const text = `Hello Team,\n\nThe following products are low on stock:\n${productLines}\n\nPlease restock.\n\nRegards`;
        await Promise.all(emails.map(email => sendEmail(email, subject, text)));
        return res.status(200).json({ message: "Low stock alert email sent successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || "Server Error" });
    }
};
