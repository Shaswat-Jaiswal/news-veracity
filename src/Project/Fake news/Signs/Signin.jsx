import { InputField } from "./InputField.jsx";
import { useState } from "react";
import "./Signin.css";
import api from "../api/axios.js";
import { PAGES } from "../../../constants/pages";


export const Signin = ({ setPage }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    MobileNo: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post("/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.MobileNo,
        password: formData.Password,
      });

      alert(data.message);
      setPage(PAGES.LOGIN);


    } catch (error) {
      alert(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mobile No", name: "MobileNo" },
    { label: "Password", name: "Password", type: "password" },
    { label: "Confirm Password", name: "ConfirmPassword", type: "password" },
  ];

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
                    onChange: handleChange,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => setPage(PAGES.LOGIN)}>Login</span>
        </p>
      </div>
    </div>
  );
};
