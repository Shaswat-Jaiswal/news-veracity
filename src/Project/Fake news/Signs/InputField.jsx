import React from "react";

export const InputField = ({ data }) => {
    const { name, placeholder, value, onChange, type = "text" } = data;

    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    );
}; 
