import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const resetPassword = async (req, res) => {
    try{
        const{ resetToken, password} = req.body;

        if (!resetToken) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required",
            });
        }

        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user){
            return res.status(404).json({
                success: false,
                message: "Invalid token or user not found",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch(error){
        console.error("Reset password error", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
};