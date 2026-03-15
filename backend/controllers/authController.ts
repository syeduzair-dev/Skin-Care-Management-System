import { Request, Response } from "express";
import Staff from "../models/Staff.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";



const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const signup = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const existing = await Staff.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const user = await Staff.create({ email, password, role });
    res.status(201).json({ user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const user = await Staff.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    
   

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await Staff.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.password = otp; // Temporary OTP for demo
    await user.save();

    await sendEmail(email, "OTP for Password Reset", `Your OTP is ${otp}`);
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await Staff.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== otp) return res.status(400).json({ message: "Invalid OTP" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import Staff from "../models/Staff.js";

// const JWT_SECRET = process.env.JWT_SECRET as string;

// const VALID_ROLES = ["admin", "product_manager", "sales"];

// export const signup = async (req: Request, res: Response) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role)
//     return res.status(400).json({ message: "All fields required" });

//   if (!VALID_ROLES.includes(role))
//     return res.status(400).json({ message: "Invalid role" });

//   try {
//     const exists = await Staff.findOne({ email });
//     if (exists)
//       return res.status(400).json({ message: "Email already exists" });

//     const user = await Staff.create({ email, password, role });

//     res.status(201).json({
//       user: { email: user.email, role: user.role },
//     });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role)
//     return res.status(400).json({ message: "Invalid credentials" });

//   try {
//     const user = await Staff.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const match = await user.comparePassword(password);
//     if (!match) return res.status(400).json({ message: "Invalid credentials" });

//     if (user.role !== role)
//       return res.status(403).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: { email: user.email, role: user.role },
//     });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };
