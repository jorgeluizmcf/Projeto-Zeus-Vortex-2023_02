// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext'; // Importe o contexto de toast

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { showToast } = useToast(); // Use o hook useToast para exibir mensagens
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se há um token no localStorage

  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Você precisa estar logado para acessar esta página.', 'warning'); // Mostra um toast de aviso
    }
  }, [isAuthenticated, showToast]);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
