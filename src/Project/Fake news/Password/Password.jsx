import { useState } from "react";
import { TbPlaceholder } from "react-icons/tb"
import { PAGES } from "../../../constants/pages";
import api from "../api/axios";

import "./password.css";

export const Password = ({ setPage, setResetToken }) =>{
    const[email, setEmail] = useState("");
    const[message, setMessage] = useState("");
    const checkEmail = async () =>{
        try{
            const res = await api.post("/auth/forgot-password", {email});
        
            if(res.data.success){
            setMessage("Email verified ✔");
            setResetToken(res.data.resetToken);
            
            setTimeout(() => {
          setPage(PAGES.RESET_PASSWORD);
        }, 1000);

        }else{
            setMessage("Email not found ❌")
        }
        } catch(error){
            console.log("Error:", error);
            console.log("Error response:", error.response);
            setMessage("Server error ❌");
        }
    }
    return (
        <div className="pass">
            <div className="card">
            <h1 className="h5">Forgot password</h1>
        <label className="input-label"> Enter Email Address</label>
        <input 
        type = "email"
        className="input-field "
        placeholder="Enter email"
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
        />
        <button className="reset-btn" onClick={checkEmail}>Reset Password </button>
        {message && <p>{message}</p>}
        </div>
        </div>
    )
}
