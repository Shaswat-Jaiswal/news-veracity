import express from "express";
import { signup } from "../auth/signupController.js";
import { login } from "../auth/loginController.js";
import { forgotPassword } from "../auth/forgotPasswordController.js";
import { resetPassword } from "../auth/resetPasswordController.js";
import { changePassword } from "../auth/changePasswordController.js";
import { deleteAccount } from "../auth/deleteAccountController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", authMiddleware, changePassword);
router.delete("/delete-account" ,authMiddleware, deleteAccount);

// 🔒 Protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.userId,
  });
});

export default router;
