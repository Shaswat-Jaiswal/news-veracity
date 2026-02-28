import { useState } from "react";
import "./Navbar.css";
import { Changepassword } from "../Setting/Changepassword.jsx";
import { AccountDelete } from "../Setting/AccountDelete.jsx";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const closeAll = () => {
    setShowPassword(false);
    setShowDelete(false);
  };

  return (
    <div className="simple-navbar">
      <h3>Home</h3>
      <h3>Blog</h3>

      <div className="settings">
        <h3
          onClick={() => {
            setOpen(!open);
            closeAll();
          }}
        >
          Settings
        </h3>

        {/* SETTINGS MENU */}
        {open && !showPassword && !showDelete && (
          <div className="dropdown">
            <p onClick={() => setShowPassword(true)}>
              Change Password
            </p>

            <p>Change Username</p>

            <p
              style={{ color: "red" }}
              onClick={() => setShowDelete(true)}
            >
              Account Delete
            </p>
          </div>
        )}

        {/* CHANGE PASSWORD */}
        {open && showPassword && (
          <div className="dropdown">
            <Changepassword goBack={closeAll} />
          </div>
        )}

        {/* ACCOUNT DELETE */}
        {open && showDelete && (
          <div className="dropdown">
            <AccountDelete />
          </div>
        )}
      </div>

      <h3>About Us</h3>
      <h3>Our Team</h3>
    </div>
  );
};
