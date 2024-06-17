const pool = require('../config/dbConfig');

const Pet = {
  create: (newPet) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'INSERT INTO pet (nome, data_nascimento, tipo, raca, foto, id_usuario) VALUES (?, ?, ?, ?, ?, ?)',
        [newPet.nome, newPet.data_nascimento, newPet.tipo, newPet.raca, newPet.foto, newPet.id_usuario],
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

module.exports = Pet;
