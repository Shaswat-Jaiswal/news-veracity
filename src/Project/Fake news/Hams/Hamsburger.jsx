import { useState } from "react";
import "./Hamburger.css";
import { Toggle } from "../Toggles/Toggle";


export const Hamburger = ({ setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="A">

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>

      {/* Slide-in Menu */}
      {menuOpen && (
        <div className="hamburger-menu">

          <div className="login-row">
            <p className="login-title">Welcome</p>
            <p
              className="login-btn"
              onClick={() => {
                setPage("signin"); // App.jsx will render Signin page
                setMenuOpen(false); // close menu
              }}
            >
              Sign in / Login
            </p>
          </div>

          

          {/* Other menu items */}
          <p className="menu-item">Notes</p>
          <p className="menu-item">Ideas</p>

          <Toggle />

        </div>
      )}

    </div>
  );
};
