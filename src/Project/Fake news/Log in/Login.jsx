import { useState } from "react";
import { PAGES } from "../../../constants/pages";
import { FaRegUser, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import "./Login.css";
import api from "../api/axios";


export const Login = ({ setPage }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });
    alert(data.message);
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    setPage(PAGES.HOME);
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

    return (
        <div className="Login-page">
            <div className="container-1">
                <h2 className="a1">Login</h2>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <div className="input-box">
                        <FaRegUser className="icon" />
                        <input
                            type="email"
                            placeholder="Type your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <br /><br />

                    <label>Password</label>
                    <div className="input-box">
                        <TbLockPassword className="icon" />
                        <input
                            type="password"
                            placeholder="Type your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <p 

                    className="forgot"
                    style = {{cursor: "pointer"}}
                    onClick={() => setPage(PAGES.FORGOT_PASSWORD)}
                    >
                        Forgot password?
                        </p>

                    <br /><br />

                    <div className="button">
                        <input type="submit" value="Log-in" />
                    </div>
                </form>

                <p className="b1">Or Login Using</p>

                <div className="social-login">
                    <div className="social facebook" title="Facebook Login">
                        <FaFacebook />
                    </div>

                    <div className="social twitter" title="Twitter Login">
                        <FaTwitter />
                    </div>

                    {/* Google icon only for UI */}
                    <div className="social google" title="Google Login">
                        <FaGoogle />
                    </div>
                </div>

                <p className="c1">or Signup Using</p>
                <h4
          className="d1"
          onClick={() => setPage(PAGES.SIGNUP)}
          style={{ cursor: "pointer" }}
        >
                    SIGN UP
                </h4>
            </div>
        </div>
    );
};
