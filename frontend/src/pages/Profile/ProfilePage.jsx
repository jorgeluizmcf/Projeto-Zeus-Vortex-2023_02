// src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ProfilePage.css';
import fotoUsuario from '../../img/foto-usuario-default.jpg';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('/user/info'); // Endpoint fictício para obter informações do usuário
      setUserInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="profile-page">
      <header className="profile-header">
        <img className="user-avatar" src={fotoUsuario} alt="Foto do usuário" />
        <div className="user-info">
          <h1>{userInfo.name}</h1>
          <p>{userInfo.email}</p>
        </div>
      </header>

      <main className="profile-main">
        <section className="profile-section">
          <h2>Informações do Perfil</h2>
          <div className="info-item">
            <strong>Nome:</strong> <span>{userInfo.name}</span>
          </div>
          <div className="info-item">
            <strong>E-mail:</strong> <span>{userInfo.email}</span>
          </div>
          <div className="info-item">
            <strong>Telefone:</strong> <span>{userInfo.phone}</span>
          </div>
          <div className="info-item">
            <strong>Endereço:</strong> <span>{userInfo.address}</span>
          </div>
        </section>

        <section className="profile-section">
          <h2>Preferências</h2>
          <div className="info-item">
            <strong>Interesses:</strong> <span>{userInfo.interests.join(', ')}</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
