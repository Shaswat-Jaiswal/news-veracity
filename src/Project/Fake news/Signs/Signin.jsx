import { InputField } from "./InputField";
import { useState } from "react";
import "./Signin.css";


export const Signin = () => {
 const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    MobileNo: "",
    Otp: "",
    Password: "",
    Confirm: ""
 });

  const fields = [
    { label: "First Name", name: "firstName", placeholder: "Enter your first name" },
    { label: "Last Name", name: "lastName", placeholder: "Enter your last name" },
    { label: "Email", name: "email", placeholder: "Enter your email", type: "email" },
    { label: "Mobile No", name: "MobileNo", placeholder: "Enter your mobile number" },
    { label: "Otp", name: "Otp", placeholder: "Enter your otp" },
    { label: "Password", name: "Password", placeholder: "Enter your password", type: "password" },
    { label: "Confirm Password", name: "ConfirmPassword", placeholder: "Confirm your password", type: "password" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const handleSendOtp = () => {
    if(formData.MobileNo){
        console.log(`Sending ${formData.MobileNo}`)
    } else{
        alert("Please enter mobile number first");
    }
  };

  return (
    <div className="signin-page">

      <div className="signin-container">
        <div className="title">Registration Form</div>

        <form onSubmit={handleSubmit}>

          <div className="user-details">

           {fields.map((field) => (
              <div className="input-box" key={field.name}>
                <span className="details">{field.label}</span>

                <InputField
                  data={{
                    ...field,
                    value: formData[field.name],
                    onChange: handleChange
                  }}
                />

                {field.name === "MobileNo" && (
                    <button
                    type="button"
                    className="send-otp-btn"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                )}
              </div> 
            ))} 

          </div>

          <div className="button">
            <input type="submit" value="Register" />
          </div>

        </form>
      </div>

    </div>
  );
};
