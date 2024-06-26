// src/components/CreateAccountComponent/index.jsx
import "./styles.css";
import React, { useState } from "react";

import { ReactComponent as HiddenShowPwd } from "../../img/hiddenShowPwd.svg";
import { ReactComponent as ShowPwd } from "../../img/showPassword.svg";
import { useLoginContext } from "../../contexts/LoginContext";

const CreateAccountComponent = ({ onBack }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [termsFlag, setTermsFlag] = useState(false);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const { setToggleForgotPassword, setToggleCreateAccount } = useLoginContext();

  const handleTogglePasswordVisibility = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  return (
    <div className="create-account-component">
      <h2 className="create-account-component-title">Crie a sua conta</h2>
      <div className="create-account-component-group">
        <label
          className="create-account-component-group-input-text"
          htmlFor="name"
        >
          nome
        </label>
        <div className="create-account-component-group-input-label">
          <input
            type="text"
            id="name"
            className="create-account-component-group-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      </div>
      <div className="create-account-component-group">
        <label
          className="create-account-component-group-input-text"
          htmlFor="email"
        >
          email
        </label>
        <div className="create-account-component-group-input-label">
          <input
            type="email"
            id="email"
            className="create-account-component-group-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="create-account-component-group">
        <label
          className="create-account-component-group-input-text"
          htmlFor="password"
        >
          senha
        </label>
        <div className="create-account-component-group-input-label">
          <input
            type={toggleShowPassword ? "text" : "password"}
            id="password"
            className="create-account-component-group-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="create-account-component-group-input-icon"
            onClick={handleTogglePasswordVisibility}
          >
            {toggleShowPassword ? <ShowPwd /> : <HiddenShowPwd />}
          </div>
        </div>
      </div>
      <div className="create-account-component-group">
        <label
          className="create-account-component-group-input-text"
          htmlFor="passwordConfirm"
        >
          confimação de senha
        </label>
        <div className="create-account-component-group-input-label">
          <input
            type={toggleShowPassword ? "text" : "password"}
            id="passwordConfirm"
            className="create-account-component-group-input"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div
            className="create-account-component-group-input-icon"
            onClick={handleTogglePasswordVisibility}
          >
            {toggleShowPassword ? <ShowPwd /> : <HiddenShowPwd />}
          </div>
        </div>
      </div>
      <div
        className="create-account-component-group-button-back"
        onClick={onBack}
      >
        Voltar
      </div>

      {/* Adicione seu formulário de criação de conta aqui */}
    </div>
  );
};

export default CreateAccountComponent;
