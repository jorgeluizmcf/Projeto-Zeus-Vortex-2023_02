// src/pages/LoginPage.js

import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();

  const handleLogin = () => {
    // Simulação de login bem-sucedido
    // Normalmente, você faria uma chamada para a API para autenticar o usuário
    setTimeout(() => {
      history.push('/home'); // Navega para a página Home após o login
    }, 1000); // Simulação de delay de 1 segundo para login
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
