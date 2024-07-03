import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import Sidebar from "../../components/Sidebar/index.jsx";
import MainPanel from "../../components/MainPanel/index.jsx";
import GenericModal from "../../components/GenericModal/index.jsx"; // Importar o componente GenericModal
import { useToast } from "../../contexts/ToastContext"; // Importar o contexto
import { useNavigate } from "react-router-dom";
import { DotLottiePlayer, PlayerEvents } from "@dotlottie/react-player";
import dayjs from "dayjs";

import "@dotlottie/react-player/dist/index.css";

import "./App.css";
import "../../styles/global.css";

const HomePage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [date, setDate] = useState(dayjs()); // Inicializa com a data atual
  const [despesaAlimentacao, setDespesaAlimentacao] = useState(0);
  const [despesaHigiene, setDespesaHigiene] = useState(0);
  const [despesaBrinquedos, setDespesaBrinquedos] = useState(0);
  const [despesaVeterinario, setDespesaVeterinario] = useState(0);

  const [showGraph, setShowGraph] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [idUsuario] = useState(() => {
    // Substitua com a lógica real para obter o id do usuário
    return 15;
  });

  const [idPet] = useState(() => {
    // Substitua com a lógica real para obter o id do pet, se necessário
    return null;
  });

  useEffect(() => {
    const selectedMonth = date.format("MM");
    const selectedYear = date.year();
    fetchCategoriaValues(selectedMonth, selectedYear, idUsuario, idPet);
  }, [date, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleShowGraph = () => {
    setShowGraph(!showGraph);
  };

  const fetchCategoriaValues = (date, idUsuario, idPet) => {
    const params = {
      id_usuario: idUsuario,
    };

    if (idPet) {
      params.id_pet = idPet;
    }

    const categorias = [0, 1, 2, 3]; // Um array de IDs de categoria
    categorias.forEach((categoriaId) => {
      api
        .get(`/despesas`, { params: { ...params, tipoDespesa: categoriaId } })
        .then((response) => {
          // Atualize os estados das despesas com os valores da resposta da API
          switch (categoriaId) {
            case 0:
              setDespesaAlimentacao(response.data.total);
              break;
            case 1:
              setDespesaHigiene(response.data.total);
              break;
            case 2:
              setDespesaBrinquedos(response.data.total);
              break;
            case 3:
              setDespesaVeterinario(response.data.total);
              break;
            default:
              // Lidar com outros IDs de categoria, se necessário
              break;
          }
        })
        .catch((error) => {
          showToast(
            `Erro ao buscar despesas para categoria ${categoriaId}: ${
              error.response?.data?.message || error.message
            }`,
            "error"
          );
          console.error(
            `Erro ao buscar despesas para categoria ${categoriaId}:`,
            error
          );
        });
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
        api.defaults.headers.common["Authorization"] = null; // Remove o token do header Authorization

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

      {loading ? (
        <div className="home-loading">
          {console.log("Começou a carregar", loading)}
          <DotLottiePlayer
            className="home-loading-splash"
            src="https://lottie.host/c8c69de4-5915-4d6b-b7dd-b316a0a13af7/gpNco0avnr.json"
            autoplay
            loop={false}
            onEvent={(event) => {
              if (event === PlayerEvents.Complete) {
                setLoading(false);
              }
            }}
          />
        </div>
      ) : (
        <MainPanel
          date={date}
          setDate={setDate}
          despesaAlimentacao={despesaAlimentacao}
          despesaHigiene={despesaHigiene}
          despesaBrinquedos={despesaBrinquedos}
          despesaVeterinario={despesaVeterinario}
          showGraph={showGraph}
          dashboardData={dashboardData}
        />
      )}

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
