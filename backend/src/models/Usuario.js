// /src/models/Usuario.js
const bcrypt = require('bcrypt');
const pool = require('../config/dbConfig');

const Usuario = {
  create: async (newUsuario) => {
    try {
      const hashedPassword = await bcrypt.hash(newUsuario.senha, 10);
      const [results] = await pool.execute(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
        [newUsuario.nome, newUsuario.email, hashedPassword]
      );
      return results.insertId;
    } catch (err) {
      throw err;
    }
  },

  findOne: async (email) => {
    try {
      const [results] = await pool.execute(
        'SELECT * FROM usuario WHERE email = ?',
        [email]
      );
      if (results.length === 0) {
        return null;
      } else {
        return results[0];
      }
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Usuario;
