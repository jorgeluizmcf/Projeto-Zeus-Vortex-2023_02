import axios from 'axios';

// Crie uma instância do Axios configurada para o seu backend HTTPS
const api = axios.create({
  baseURL: 'https://localhost:3333', // Substitua pelo seu URL backend
  // Configurações adicionais para SSL (opcional):
  // Você pode adicionar outras configurações do Axios aqui, se necessário
  // timeout: 10000, // Exemplo de configuração adicional
  // headers: {
  //   'Authorization': 'Bearer token', // Exemplo de header adicional
  // },
  // ...
});

export default api;
