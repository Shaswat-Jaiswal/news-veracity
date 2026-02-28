import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.userId;

        console.log('Delete account request for userId:', userId);

        const user = await User.findById(userId);
        if (!user){
            console.log('User not found');
            return res.status(404).json({ message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log('Incorrect password');
            return res.status(400).json({ message: "Incorrect Password"});
        }

        await User.findByIdAndDelete(userId);
        console.log('User deleted successfully');

        res.status(200).json({
            message: "Account Deleted Permanently",
            logout: true,
});
    } catch (error){
        console.error('Server error:', error);
        res.status(500).json({ message: "Server error"});
    }
}