import "./loginPage.css"; // Certifique-se de que o nome do arquivo CSS está correto
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Importe sua instância personalizada do axios


import LoginComponent from "../../components/LoginComponent/index";

// Importar os ícones SVG corretamente
import { ReactComponent as LinkedinIcon } from "../../img/icone-linkedin.svg";
import { ReactComponent as GithubIcon } from "../../img/icone-github.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, senha: password });
      const { token } = response.data;
      
      console.log("Login bem-sucedido. Token:", token);
      
      // Armazenar o token no localStorage
      localStorage.setItem("token", token);
      
      // Navegar para a próxima página após o login (opcional)
      navigate("/home"); // Exemplo: redireciona para a página de dashboard após o login
    } catch (error) {
      console.error("Erro durante o login:", error);
      // Tratar erros e fornecer feedback ao usuário, por exemplo:
      alert("Erro durante o login. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-logo"></div>
      <div className="login-page-area">
        <LoginComponent onLogin={handleLogin} />
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
  );
};

export default LoginPage;
