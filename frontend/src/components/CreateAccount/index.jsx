import "./styles.css";
import React, { useState } from "react";

import { ReactComponent as HiddenShowPwd } from "../../img/hiddenShowPwd.svg";
import { ReactComponent as ShowPwd } from "../../img/showPassword.svg";
import { useLoginContext } from "../../contexts/LoginContext";

import Check from "../../img/check.png";
import Cross from "../../img/cross.png";
import Interrogation from "../../img/interrogation.png";

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

  const isNameValid = (name) => {
    const namePattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    return namePattern.test(name);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="create-account-component">
      <h2 className="create-account-component-title">Crie a sua conta</h2>
      <div className="create-account-component-group">
        <div className="create-account-component-group-input-text-div">
          <label
            className="create-account-component-group-input-text"
            htmlFor="name"
          >
            nome
          </label>
          {nome.length > 0 && (
            <img
              src={isNameValid(nome) ? Check : Cross}
              className="create-account-component-group-input-icon"
            />
          )}
        </div>
        <div className="create-account-component-group-input-label">
          <input
            type="text"
            id="name"
            className="create-account-component-group-input"
            value={nome}
            maxLength="200"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      </div>
      <div className="create-account-component-group">
        <div className="create-account-component-group-input-text-div">
          <label
            className="create-account-component-group-input-text"
            htmlFor="email"
          >
            email
          </label>
          {email.length > 0 && (
            <img
              src={isEmailValid(email) ? Check : Cross}
              className="create-account-component-group-input-icon"
            />
          )}
        </div>
        <div className="create-account-component-group-input-label">
          <input
            type="email"
            id="email"
            className="create-account-component-group-input"
            value={email}
            maxLength="200"
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
          confirmação de senha
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
      <div className="create-account-component-group-password-requirements">
        <div className="create-account-component-group-password-requirements-label">
          <label>a senha deve conter letras</label>
          <img
            src={Interrogation}
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>a senha deve conter números</label>
          <img
            src={Interrogation}
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>a senha deve conter maiúscula(s)</label>
          <img
            src={Interrogation}
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>pelo menos 8 dígitos </label>
          <img
            src={Interrogation}
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>as senhas conferem </label>
          <img
            src={Interrogation}
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
      </div>
      <div className="create-account-component-group-buttons">
        <div
          className="create-account-component-group-button-back"
          onClick={onBack}
        >
          Voltar
        </div>
        <div
          className="create-account-component-group-button-confirm"
          onClick={() => {
            console.log("clicou");
          }}
        >
          Confirmar
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
