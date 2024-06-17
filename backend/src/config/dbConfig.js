const mysql = require('mysql2');

// Configurações de conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // substitua pelo seu usuário
  password: '12345678', // substitua pela senha do seu usuário
  database: 'sua_database', // substitua pelo nome da sua database
  port: 3306
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

module.exports = connection;
