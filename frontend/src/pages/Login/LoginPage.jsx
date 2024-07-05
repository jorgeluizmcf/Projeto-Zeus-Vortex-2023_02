// src/pages/Login/LoginPage.jsx
import "./loginPage.css"; // Certifique-se de que o nome do arquivo CSS está correto
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Importe sua instância personalizada do axios
import { LoginProvider, useLoginContext } from "../../contexts/LoginContext"; // Importe o contexto
import { useToast } from '../../contexts/ToastContext'; // Importar o contexto

import LoginComponent from "../../components/LoginComponent";
import ForgotPasswordComponent from "../../components/ForgotPassword";
import CreateAccountComponent from "../../components/CreateAccount";

// Importar os ícones SVG corretamente
import { ReactComponent as LinkedinIcon } from "../../img/icone-linkedin.svg";
import { ReactComponent as GithubIcon } from "../../img/icone-github.svg";
import LogoNoBackground from "../../img/logo-noBackground.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // Utilizar o contexto

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        senha: password,
      });
      const { token } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);

      // Navegar para a próxima página após o login (opcional)
      navigate("/home"); // Exemplo: redireciona para a página de dashboard após o login
      showToast('Login bem-sucedido!', 'success'); // Mostrar toast de sucesso
    } catch (error) {
      console.error("Erro durante o login:", error);
      showToast('Erro durante o login. Verifique suas credenciais e tente novamente.', 'error'); // Mostrar toast de erro
    }
  };

  return (
    <LoginProvider>
      <div className="login-page">
        <div className="login-page-logo">
          <img className="login-page-logo-img" src={LogoNoBackground} alt="Logo" />
        </div>
        <div className="login-page-area">
          <LoginContainer handleLogin={handleLogin} />
        </div>
        <footer className="footer">
          &copy; 2024 Todos os direitos reservados. Desenvolvido por Jorge Luiz.
          <LinkedinIcon />
          <a
            href="https://www.linkedin.com/in/jorge-luiz-marques-da-costa-filho-86a771206"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          |
          <GithubIcon />
          <a
            href="https://github.com/jorgeluizmcf"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </LoginProvider>
  );
};

const LoginContainer = ({ handleLogin }) => {
  const {
    toggleForgotPassword,
    setToggleForgotPassword,
    toggleCreateAccount,
    setToggleCreateAccount
  } = useLoginContext();

  if (toggleForgotPassword) {
    return <ForgotPasswordComponent onBack={() => setToggleForgotPassword(false)} />;
  }

  if (toggleCreateAccount) {
    return <CreateAccountComponent onBack={() => setToggleCreateAccount(false)} />;
  }

  return (
    <LoginComponent
      onLogin={handleLogin}
      onForgotPassword={() => setToggleForgotPassword(true)}
      onCreateAccount={() => setToggleCreateAccount(true)}
    />
  );
};

export default LoginPage;
