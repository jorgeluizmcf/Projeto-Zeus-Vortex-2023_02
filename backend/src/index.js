// src/app.js (ou index.js, dependendo de como você nomeou seu arquivo principal)

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { handleJsonErrors } = require('./middleware');

const app = express();

app.use(bodyParser.json());

// Usar o middleware para tratar erros de JSON
app.use(handleJsonErrors);

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
