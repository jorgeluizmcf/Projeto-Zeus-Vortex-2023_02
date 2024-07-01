import axios from 'axios';

// Crie uma instância do Axios configurada para o seu backend HTTPS
const api = axios.create({
  baseURL: 'https://localhost:3333', // Substitua pelo URL do seu backend
  withCredentials: true, // Inclui cookies nas solicitações, se necessário
  headers: {
    'Authorization': 'Bearer token', // Exemplo de header adicional
  },
  // ...
});

// Adicione um interceptor para adicionar o token ao header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
