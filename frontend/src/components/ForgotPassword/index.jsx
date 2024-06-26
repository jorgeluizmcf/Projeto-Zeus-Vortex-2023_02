// src/components/ForgotPasswordComponent/index.jsx
import "./styles.css";
import React from "react";


const ForgotPasswordComponent = ({ onBack }) => {
  return (
    <div>
      <h2>Esqueci minha senha</h2>
      {/* Adicione seu formulário de recuperação de senha aqui */}
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};

export default ForgotPasswordComponent;
