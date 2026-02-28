import { useState } from "react";
import "./ChangePassword.css";
import api from "../api/axios";

export const Changepassword = ({ goBack }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = async () => {
    // 1️⃣ Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      // 2️⃣ API call (JWT auto-added by axios interceptor)
      const res = await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      alert(res.data.message || "Password changed successfully ✅");

      if (res.data.logout) {
    localStorage.removeItem("token"); // 🔒 logout
    window.location.href = "/login";
  }

      // 3️⃣ Clear fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      goBack();
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="password-dropdown">
      <h1 className="h2">Change Password</h1>

      <input
        type="password"
        className="p1"
        placeholder="Current Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        className="p2"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        className="p3"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="c1" onClick={handleChange}>
        Change Password
      </button>
    </div>
  );
};
