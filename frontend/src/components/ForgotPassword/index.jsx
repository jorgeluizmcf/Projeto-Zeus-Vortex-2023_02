// src/components/ForgotPasswordComponent/index.jsx
import "./styles.css";
import React from "react";

const ForgotPasswordComponent = ({ onBack }) => {
  return (
    <div>
      <h2>Esqueci minha senha</h2>
      <div className="testeForgot">
        <p>Cria outra conta :P</p>
        <p>Brinks, tá em desenvolvimento</p>
      </div>
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};

export default ForgotPasswordComponent;
