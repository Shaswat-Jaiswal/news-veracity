import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const forgotPassword = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.json({
                success:false,
                message: "Email not found"
            });
        }

        const resetToken= jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "10m"}
        );
        user.resetToken = resetToken;
        await user.save();

        res.json({
            success: true,
            message: "Email verified",
            resetToken,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}