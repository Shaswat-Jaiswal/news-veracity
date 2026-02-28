import { useState } from "react"
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import "./Toggle.css";

export const Toggle = ({ isDark, setIsDark }) => {
    return (
        <div className="toggle-wrapper" 
        onClick={() => setIsDark(!isDark)}
        >
            {isDark ? (
                <MdToggleOn className="toggle-icon on" />
            ) : (
                <MdToggleOff className="toggle-icon off" />
            )}
        </div>
    );
};
