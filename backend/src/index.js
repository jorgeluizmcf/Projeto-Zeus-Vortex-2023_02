// index.js
const dotenv = require('dotenv');
dotenv.config();
const https = require('https');
const fs = require('fs');
const path = require('path'); // Adicionando o require para o módulo 'path'
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const { handleJsonErrors } = require('./middleware');

dotenv.config();
const app = express();

// Middlewares
app.use(bodyParser.json()); // Middleware para interpretar JSON no corpo das requisições

// Middleware para lidar com erros em formato JSON
app.use(handleJsonErrors);

// Habilitar CORS
app.use(cors());

// Rotas
app.use(routes);

// Caminhos para os certificados
const certPath = path.resolve(__dirname, '../certs'); // Calcula o caminho absoluto para 'certs/'
const httpsOptions = {
  key: fs.readFileSync(path.join(certPath, 'server.key')),
  cert: fs.readFileSync(path.join(certPath, 'server.cert'))
};

// Configuração do servidor
const PORT = process.env.PORT || 3333; // Porta onde o servidor vai rodar
// Criar servidor HTTPS
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});
