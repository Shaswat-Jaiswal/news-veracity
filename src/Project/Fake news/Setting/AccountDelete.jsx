import { useState } from "react";
import api from "../api/axios"; // ✅ IMPORT

export const AccountDelete = () => {
  const [password, setPassword] = useState("");

  const handleDeleteRequest = async () => {
    if (!password) {
      alert("Password required");
      return;
    }

    const confirmDelete = window.confirm(
      "This will permanently delete your account. Continue?"
    );
    if (!confirmDelete) return;

    try {
      const res = await api.delete("/auth/delete-account", {
        data: { password },
      });

      alert(res.data.message);

      localStorage.removeItem("token");
      window.location.href = "/login";

    } catch (err) {
      alert(err.response?.data?.message || "Error deleting account");
    }
  };

  return (
    <div className="ad">
      <input
        type="password"
        className="ad1"
        placeholder="Current Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="ad2" onClick={handleDeleteRequest}>
        Confirm Delete
      </button>
    </div>
  );
};
