import { useState } from "react";
import { PAGES } from "../../../constants/pages";
import api from "../api/axios";
import "./resetpassword.css";

export const ResetPassword = ({ setPage, resetToken }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        resetToken,
        password: newPassword,
      });

      setMessage("Password reset successfully ");

      setTimeout(() => {
        setPage(PAGES.LOGIN);
      }, 1500);

    } catch (error) {
      setMessage("Error resetting password ");
    }
  };

  return (
    <div className="reset">
      <div className="recard">
        <h1 className="h6">Reset Password</h1>

     <label className="input-label">Enter new password</label>
        <input
          type="password"
          className="input-field-1"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label className="input-label-1">Confirm Password</label>  
        <input
          type="password"
          className="input-field-2"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className= "reset-btn-1"onClick={handleReset}>Submit</button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};
