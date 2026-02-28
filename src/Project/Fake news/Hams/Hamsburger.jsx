import { useState } from "react";
import "./Hamburger.css";
import { Toggle } from "../Toggles/Toggle.jsx";
import { PAGES } from "../../../constants/pages";


export const Hamburger = ({ setPage, isDark, setIsDark }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
  
    setPage(PAGES.LOGIN);
    
    setMenuOpen(false);
  };

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
                setPage(PAGES.LOGIN); // App.jsx will render Signin page
                setMenuOpen(false); // close menu
              }}
            >
              Sign in / Login
            </p>
          </div>
          
          <p className="log" onClick={handleLogout}>
            Logout
            </p>

          <Toggle isDark={isDark} setIsDark={setIsDark} />

        </div>
      )}

    </div>
  );
};
