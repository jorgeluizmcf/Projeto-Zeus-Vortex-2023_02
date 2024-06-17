const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const dbConfig = require('./config/dbConfig'); // Importa a configuração do banco de dados

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
