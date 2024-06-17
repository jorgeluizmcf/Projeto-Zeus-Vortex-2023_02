const pool = require('../config/dbConfig');

const Despesa = {
  create: (newDespesa) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'INSERT INTO despesa (tipoDespesa, valorDespesa, data, id_usuario, id_pet) VALUES (?, ?, ?, ?, ?)',
        [newDespesa.tipoDespesa, newDespesa.valorDespesa, newDespesa.data, newDespesa.id_usuario, newDespesa.id_pet],
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

module.exports = Despesa;
