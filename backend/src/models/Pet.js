const pool = require('../config/dbConfig');

const Pet = {
  create: (newPet) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'INSERT INTO pet (nome, data_nascimento, tipo, raca, foto, id_usuario) VALUES (?, ?, ?, ?, ?, ?)',
        [newPet.nome, newPet.data_nascimento, newPet.tipo, newPet.raca, newPet.foto, newPet.id_usuario]
      )
      .then(result => {
        resolve(result.insertId);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM pet'
      )
      .then(results => {
        resolve(results[0]);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  update: (updatedPet) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'UPDATE pet SET nome = ?, data_nascimento = ?, tipo = ?, raca = ?, foto = ?, id_usuario = ? WHERE id = ?',
        [updatedPet.nome, updatedPet.data_nascimento, updatedPet.tipo, updatedPet.raca, updatedPet.foto, updatedPet.id_usuario, updatedPet.id]
      )
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'DELETE FROM pet WHERE id = ?',
        [id]
      )
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
    });
  }
};

module.exports = Pet;
