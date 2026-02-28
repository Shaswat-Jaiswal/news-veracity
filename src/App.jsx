import React, { useState } from "react";
import { Font } from "./Project/Fake news/Font.jsx";
import { Signin } from "./Project/Fake news/Signs/Signin.jsx";
import { Login } from "./Project/Fake news/Log in/Login.jsx";
import { PAGES } from "./constants/pages";
import { Password } from "./Project/Fake news/Password/Password.jsx";
import { ResetPassword } from "./Project/Fake news/Password/ResetPassword.jsx";

export const App = () => {
  const [page, setPage] = useState(PAGES.LOGIN);
  const [resetToken, setResetToken] = useState("");
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : "light"}>
      {page === PAGES.LOGIN && <Login setPage={setPage} />}
      {page === PAGES.SIGNUP && <Signin setPage={setPage} />}
      {page === PAGES.HOME && <Font setPage={setPage} isDark={isDark} setIsDark={setIsDark} />}
      {page === PAGES.FORGOT_PASSWORD && <Password setPage={setPage} setResetToken={setResetToken} />}
      {page === PAGES.RESET_PASSWORD && <ResetPassword setPage={setPage} resetToken={resetToken} />}
    </div>
  );
};

