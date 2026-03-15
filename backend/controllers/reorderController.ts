import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";

export const sendReorderEmail = async (req: Request, res: Response) => {
  const { email, supplierName, quantity } = req.body;

  if (!email || !quantity) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await sendEmail(
      email,
      "Product Reorder Request",
      `Hello ${supplierName},

We would like to place a reorder.

Quantity: ${quantity}

Regards,
Petal Posh Team`
    );

    res.json({ success: true, message: "Reorder email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email failed" });
  }
};
