// src/components/LoginComponent.jsx

import React, { useState } from "react";
import "./styles.css";
import { ReactComponent as HiddenShowPwd } from "../../img/hiddenShowPwd.svg";
import { ReactComponent as ShowPwd } from "../../img/showPassword.svg";
import { useLoginContext } from "../../contexts/LoginContext";

const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const { setToggleForgotPassword, setToggleCreateAccount } = useLoginContext();

  const handleLogin = () => {
    onLogin(email, password);
  };

  const handleTogglePasswordVisibility = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  return (
    <div className="login-component">
      <h2 className="login-component-title">Faça o seu login</h2>
      <div className="login-component-group">
        <label className="login-component-group-input-text" htmlFor="email">
          email
        </label>
        <div className="login-component-group-input-label">
          <input
            type="email"
            id="email"
            className="login-component-group-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="login-component-group">
        <label className="login-component-group-input-text" htmlFor="password">
          senha
        </label>
        <div className="login-component-group-input-label">
          <input
            type={toggleShowPassword ? "text" : "password"}
            id="password"
            className="login-component-group-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="login-component-group-input-icon"
            onClick={handleTogglePasswordVisibility}
          >
            {toggleShowPassword ? <ShowPwd /> : <HiddenShowPwd />}
          </div>
        </div>
        <div className="login-component-group-input-redirect">
          <label
            className="login-component-group-input-redirect-text"
            onClick={() => setToggleForgotPassword(true)}
          >
            esqueci minha senha
          </label>
        </div>
      </div>
      <div className="login-component-group-button" onClick={handleLogin}>
        Entrar
      </div>

      <label
        className="login-component-group-input-redirect-text"
        onClick={() => setToggleCreateAccount(true)}
      >
        ainda não tenho uma conta
      </label>
    </div>
  );
};

export default LoginComponent;
