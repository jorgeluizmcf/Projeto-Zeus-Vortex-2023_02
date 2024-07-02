import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import Sidebar from "../../components/Sidebar/index.jsx";
import MainPanel from "../../components/MainPanel/index.jsx";
import GenericModal from "../../components/GenericModal/index.jsx"; // Importar o componente GenericModal
import { useToast } from "../../contexts/ToastContext"; // Importar o contexto
import {  useNavigate } from "react-router-dom";

import "./App.css";
import "../../styles/global.css";

const HomePage = () => {
  const monthNumberToMonthName = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "janeiro";
      case 2:
        return "fevereiro";
      case 3:
        return "março";
      case 4:
        return "abril";
      case 5:
        return "maio";
      case 6:
        return "junho";
      case 7:
        return "julho";
      case 8:
        return "agosto";
      case 9:
        return "setembro";
      case 10:
        return "outubro";
      case 11:
        return "novembro";
      case 12:
        return "dezembro";
      default:
        return ""; // Tratar valores inválidos, se necessário
    }
  };

  const { showToast } = useToast(); // Utilizar o contexto
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    return monthNumberToMonthName(currentMonth);
  });

  const [selectedYear, setSelectedYear] = useState(() => {
    const currentDate = new Date();
    return currentDate.getFullYear().toString();
  });

  const [despesaAlimentacao, setDespesaAlimentacao] = useState(0);
  const [despesaHigiene, setDespesaHigiene] = useState(0);
  const [despesaBrinquedos, setDespesaBrinquedos] = useState(0);
  const [despesaVeterinario, setDespesaVeterinario] = useState(0);

  const [showGraph, setShowGraph] = useState(true);

  const [refresh, setRefresh] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    fetchCategoriaValues(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleShowGraph = () => {
    setShowGraph(!showGraph);
  };

  const fetchCategoriaValues = (mes, ano) => {
    const categorias = [0, 1, 2, 3]; // Um array de IDs de categoria
    categorias.forEach((categoriaId) => {
      // api.get(`/calcular-total-mes/${ano}/${mes}/${categoriaId}`).then((response) => {
      //   // Atualize os estados das despesas com os valores da resposta da API
      //   switch (categoriaId) {
      //     case 0:
      //       setDespesaAlimentacao(response.data.total);
      //       break;
      //     case 1:
      //       setDespesaHigiene(response.data.total);
      //       break;
      //     case 2:
      //       setDespesaBrinquedos(response.data.total);
      //       break;
      //     case 3:
      //       setDespesaVeterinario(response.data.total);
      //       break;
      //     default:
      //       // Lidar com outros IDs de categoria, se necessário
      //       break;
      //   }
      // });
    });
  };

  const dashboardData = [
    despesaAlimentacao,
    despesaHigiene,
    despesaBrinquedos,
    despesaVeterinario,
  ];

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        localStorage.removeItem("token"); // Remove o token do localStorage
        api.defaults.headers.common['Authorization'] = null; // Remove o token do header Authorization
        
        navigate("/", { replace: true });
        showToast("Logout bem-sucedido!", "success");
      })
      .catch((error) => {
        showToast("Erro desconhecido", "error");
        console.error("Erro ao fazer logout:", error);
      });
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div id="app">
      <Sidebar
        handleLogout={handleLogout}
        handleShowGraph={handleShowGraph}
        handleRefresh={handleRefresh}
      />

      <MainPanel
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        despesaAlimentacao={despesaAlimentacao}
        despesaHigiene={despesaHigiene}
        despesaBrinquedos={despesaBrinquedos}
        despesaVeterinario={despesaVeterinario}
        showGraph={showGraph}
        dashboardData={dashboardData}
      />

      <GenericModal
        isOpen={isLogoutModalOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        title="Deseja encerrar a sessão?"
        width={400}
      />
    </div>
  );
};

export default HomePage;
