// src/components/MainPanel/index.jsx

import React from "react";
import iconeRacao from "../../img/icone-ração.png";
import iconeHigiene from "../../img/icone-higiene.png";
import iconeBrinquedos from "../../img/icone-brinquedos.png";
import iconeVeterinario from "../../img/icone-veterinario.png";
import DemoPie from "../graph-chart.js";
import "./styles.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const MainPanel = ({
  date,
  setDate,
  despesaAlimentacao,
  despesaHigiene,
  despesaBrinquedos,
  despesaVeterinario,
  showGraph,
  dashboardData,
}) => {
  return (
    <div className="screen-container">
      <h1>Categorias</h1>

      <div className="period-selecter">
        <h2>Período</h2>
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          format="DD/MM/YYYY"
        />
        {console.log(date)}
      </div>

      <div className="category-box-container">
        <div className="category-box">
          <strong className="category-title">
            Alimentação
            <img
              className="category-icon"
              src={iconeRacao}
              alt="icone de ração"
            />
          </strong>

          <div className="price-info">
            <span>R$</span>
            <span className="calculated-value">
              {despesaAlimentacao.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="category-box">
          <strong className="category-title">
            Higiene
            <img
              className="category-icon"
              src={iconeHigiene}
              alt="icone de Higiene"
            />
          </strong>

          <div className="price-info">
            <span>R$</span>
            <span className="calculated-value">
              {despesaHigiene.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="category-box">
          <strong className="category-title">
            Brinquedos
            <img
              className="category-icon"
              src={iconeBrinquedos}
              alt="icone de brinquedos"
            />
          </strong>

          <div className="price-info">
            <span>R$</span>
            <span className="calculated-value">
              {despesaBrinquedos.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <div className="category-box">
          <strong className="category-title">
            Veterinário
            <img
              className="category-icon"
              src={iconeVeterinario}
              alt="icone de veterinário"
            />
          </strong>

          <div className="price-info">
            <span>R$</span>
            <span className="calculated-value">
              {despesaVeterinario.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard">
        <h3>Dashboard</h3>

        <div className="dashboard-container">
          <div className="dashboard-graph">
            {showGraph ? <DemoPie givenData={dashboardData} /> : <></>}
          </div>

          <div className="dashboard-recents"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
