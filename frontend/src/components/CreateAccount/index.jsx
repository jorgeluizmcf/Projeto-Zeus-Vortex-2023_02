import "./styles.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Importe a instância do Axios configurada

import { ReactComponent as HiddenShowPwd } from "../../img/hiddenShowPwd.svg";
import { ReactComponent as ShowPwd } from "../../img/showPassword.svg";
import { useLoginContext } from "../../contexts/LoginContext";
import { useToast } from "../../contexts/ToastContext"; // Importar o contexto

import TermsModal from "../TermsModal/index"; // Importe o componente do modal

import Check from "../../img/check.png";
import Cross from "../../img/cross.png";
import Interrogation from "../../img/interrogation.png";

const CreateAccountComponent = ({ onBack }) => {
  const { showToast } = useToast(); // Utilizar o contexto

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [termsFlag, setTermsFlag] = useState(false);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const [validationPassed, setValidationPassed] = useState(false);
  const [toggleShowTermsModal, setToggleShowTermsModal] = useState(false);

  const { setToggleCreateAccount } = useLoginContext();

  const handleTogglePasswordVisibility = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const handleToggleShowTermsModal = () => {
    setToggleShowTermsModal(!toggleShowTermsModal);
  };

  const isNameValid = (name) => {
    const namePattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    return namePattern.test(name);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordLengthValid = (password) => password.length >= 8;
  const hasLetter = (password) => /[a-zA-Z]/.test(password);
  const hasNumber = (password) => /\d/.test(password);
  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const doPasswordsMatch = (password, passwordConfirm) =>
    password === passwordConfirm;

  useEffect(() => {
    const isFormValid =
      isNameValid(nome) &&
      isEmailValid(email) &&
      isPasswordLengthValid(password) &&
      hasLetter(password) &&
      hasNumber(password) &&
      hasUpperCase(password) &&
      doPasswordsMatch(password, passwordConfirm) &&
      termsFlag;

    setValidationPassed(isFormValid);
  }, [nome, email, password, passwordConfirm, termsFlag]);

  const handleCreateAccount = async () => {
    if (!validationPassed) return;

    try {
      const response = await api.post("/usuarios", {
        nome,
        email,
        senha: password,
      });

      console.log("Conta criada com sucesso. ID do usuário:", response.data.id);
      showToast("Conta criada com sucesso!", "success");
      onBack();
    } catch (error) {
      console.error("Erro ao criar a conta:", error);
      showToast("Erro durante o login. Email já cadastrado!", "error"); // Mostrar toast de erro
      // Limpar os campos do formulário
      setNome("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      showToast("Esqueceu a senha? Tente recuperá-la.", "warning"); // Mostrar toast de erro
    }
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
            src={
              password.length === 0
                ? Interrogation
                : hasLetter(password)
                ? Check
                : Cross
            }
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>a senha deve conter números</label>
          <img
            src={
              password.length === 0
                ? Interrogation
                : hasNumber(password)
                ? Check
                : Cross
            }
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>a senha deve conter maiúscula(s)</label>
          <img
            src={
              password.length === 0
                ? Interrogation
                : hasUpperCase(password)
                ? Check
                : Cross
            }
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>pelo menos 8 dígitos </label>
          <img
            src={
              password.length === 0
                ? Interrogation
                : isPasswordLengthValid(password)
                ? Check
                : Cross
            }
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
        <div className="create-account-component-group-password-requirements-label">
          <label>as senhas conferem </label>
          <img
            src={
              passwordConfirm.length === 0
                ? Interrogation
                : doPasswordsMatch(password, passwordConfirm)
                ? Check
                : Cross
            }
            className="create-account-component-group-password-requirements-icon"
          />
        </div>
      </div>
      <div className="create-account-component-group-checkbox-terms">
        <input
          type="checkbox"
          id="terms"
          checked={termsFlag}
          onChange={() => setTermsFlag(!termsFlag)}
          className="create-account-component-group-checkbox-terms-flag"
        />
        <label htmlFor="terms">Eu li e aceito os</label>{" "}
        <span className="terms-link" onClick={handleToggleShowTermsModal}>
          termos de uso do PataFinanceira.
        </span>
      </div>
      <TermsModal
        isOpen={toggleShowTermsModal}
        onClose={handleToggleShowTermsModal}
      />
      <div className="create-account-component-group-buttons">
        <div
          className="create-account-component-group-button-back"
          onClick={onBack}
        >
          Voltar
        </div>
        <div
          className={`create-account-component-group-button-confirm${
            validationPassed ? "" : "-disabled"
          }`}
          onClick={
            validationPassed
              ? handleCreateAccount
              : () => {
                  console.log("Dados inválidos");
                }
          }
        >
          Confirmar
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
