const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const { handleJsonErrors } = require('./middleware');

const app = express();

// Middlewares
app.use(bodyParser.json()); // Middleware para interpretar JSON no corpo das requisições

// Middleware para lidar com erros em formato JSON
app.use(handleJsonErrors);

// Habilitar CORS
app.use(cors());

// Rotas
app.use(routes);

// Configuração do servidor
const PORT = process.env.PORT || 3333; // Porta onde o servidor vai rodar
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
