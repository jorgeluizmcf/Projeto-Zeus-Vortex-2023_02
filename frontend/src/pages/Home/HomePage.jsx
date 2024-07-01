// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import AddModal from '../../components/AddModal/index.jsx';
import ListModal from '../../components/ListModal/index.jsx';
import DemoPie from '../../components/graph-chart.js';
import './App.css';
import '../../styles/global.css';
import '../../styles/sidebar.css';
import '../../styles/category-box.css';
import '../../styles/dashboard.css';
import fotoPet from '../../img/foto-pet-default.jpg';
import sidebarLogo from '../../img/sidebar-logo.png';
import iconeRacao from '../../img/icone-ração.png';
import iconeHigiene from '../../img/icone-higiene.png';
import iconeBrinquedos from '../../img/icone-brinquedos.png';
import iconeVeterinario from '../../img/icone-veterinario.png';

const HomePage = () => {
  const monthNumberToMonthName = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return 'janeiro';
      case 2:
        return 'fevereiro';
      case 3:
        return 'março';
      case 4:
        return 'abril';
      case 5:
        return 'maio';
      case 6:
        return 'junho';
      case 7:
        return 'julho';
      case 8:
        return 'agosto';
      case 9:
        return 'setembro';
      case 10:
        return 'outubro';
      case 11:
        return 'novembro';
      case 12:
        return 'dezembro';
      default:
        return ''; // Tratar valores inválidos, se necessário
    }
  };

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

  const dashboardData = [despesaAlimentacao, despesaHigiene, despesaBrinquedos, despesaVeterinario];

  const handleLogout = () => {
    if (window.confirm('Deseja encerrar a sessão?')) {
      api.post('/auth/logout')
        .then(() => {
          // Redirecionar para a página de login ou fazer logout do usuário
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('Erro ao fazer logout:', error);
        });
    }
  };

  return (
    <div id="app">
      <aside className="sidebar">
        <img className="foto-pet" src={fotoPet} alt="Foto pet" />
        <strong className="nome-pet">Zeus</strong>
        <div className="button-elements">
          <div className="button-group">
            <AddModal onShow={handleShowGraph} handleRefresh={handleRefresh} />
            <ListModal onShow={handleShowGraph} handleRefresh={handleRefresh} />
          </div>

          <div className="separator"></div>

          <div className="perfil-sidebar">
            {/* <img className="sidebar-logo" src={sidebarLogo} alt="logo do app" /> */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </aside>

      <div className="screen-container">
        <h1>Categorias</h1>

        <div className="period-selecter">
          <h2>Período</h2>

          <label htmlFor="periodo-mes">Mês: </label>
          <select
            id="periodo-mes"
            name="periodo-mes"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
          >
            <option value="janeiro">janeiro</option>
            <option value="fevereiro">fevereiro</option>
            <option value="março">março</option>
            <option value="abril">abril</option>
            <option value="maio">maio</option>
            <option value="junho">junho</option>
            <option value="julho">julho</option>
            <option value="agosto">agosto</option>
            <option value="setembro">setembro</option>
            <option value="outubro">outubro</option>
            <option value="novembro">novembro</option>
            <option value="dezembro">dezembro</option>
          </select>

          <form>
            <label htmlFor="periodo-ano">Ano: </label>
            <select
              id="periodo-ano"
              name="periodo-ano"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </form>
        </div>

        <div className="category-box-container">
          <div className="category-box">
            <strong className="category-title">
              Alimentação
              <img className="category-icon" src={iconeRacao} alt="icone de ração" />
            </strong>

            <div className="price-info">
              <span>R$</span>
              <span className="calculated-value">{despesaAlimentacao.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <div className="category-box">
            <strong className="category-title">
              Higiene
              <img className="category-icon" src={iconeHigiene} alt="icone de Higiene" />
            </strong>

            <div className="price-info">
              <span>R$</span>
              <span className="calculated-value">{despesaHigiene.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <div className="category-box">
            <strong className="category-title">
              Brinquedos
              <img className="category-icon" src={iconeBrinquedos} alt="icone de brinquedos" />
            </strong>

            <div className="price-info">
              <span>R$</span>
              <span className="calculated-value">{despesaBrinquedos.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <div className="category-box">
            <strong className="category-title">
              Veterinário
              <img className="category-icon" src={iconeVeterinario} alt="icone de veterinário" />
            </strong>

            <div className="price-info">
              <span>R$</span>
              <span className="calculated-value">{despesaVeterinario.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>

        <div className="dashboard">
          <h3>Dashboard</h3>

          <div className="dashboard-container">
            <div className="dashboard-graph">{showGraph ? <DemoPie givenData={dashboardData} /> : <></>}</div>

            <div className="dashboard-recents"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
