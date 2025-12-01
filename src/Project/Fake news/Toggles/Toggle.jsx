import { useState } from "react"
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import "./Toggle.css";

export const Toggle = ({ isDark, setIsDark }) => {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="toggle-wrapper" onClick={() => setIsOn(!isOn)}>
            {isOn ? (
                <MdToggleOn className="toggle-icon on" />
      ) : (
        <MdToggleOff className="toggle-icon off" />
      )}
        </div>
    ) 
}