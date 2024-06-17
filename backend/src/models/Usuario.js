const pool = require('../config/dbConfig');

const Usuario = {
  create: (newUsuario) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
        [newUsuario.nome, newUsuario.email, newUsuario.senha],
        (err, results, fields) => {
          if (err) {
            reject(err);
          }
          resolve(results.insertId);
        }
      );
    });
  }
};

module.exports = Usuario;
