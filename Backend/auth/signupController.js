import User from "../models/User.js";
import bcrypt from "bcryptjs";

// SIGNUP
export const signup = async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};
