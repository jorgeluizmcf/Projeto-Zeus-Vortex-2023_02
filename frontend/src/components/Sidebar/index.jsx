// src/components/Sidebar.jsx
import "./styles.css"

import React from 'react';
import AddModal from '../AddModal/index.jsx';
import ListModal from '../ListModal/index.jsx';
import fotoPet from '../../img/foto-pet-default.jpg';
import sidebarLogo from '../../img/sidebar-logo.png';

const Sidebar = ({ handleShowGraph, handleRefresh, handleLogout }) => {
  return (
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
          <button onClick={handleLogout} className="logoff-button">Sair</button>
          <img className="sidebar-logo" src={sidebarLogo} alt="logo do app" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
