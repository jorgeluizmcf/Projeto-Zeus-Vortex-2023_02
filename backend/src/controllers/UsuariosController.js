const pool = require('../config/dbConfig');

module.exports = {
  async read(request, response) {
    try {
      const [rows, fields] = await pool.execute('SELECT * FROM usuario');
      return response.json(rows);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar os usuários.' });
    }
  },

  async create(request, response) {
    const { usuario, email, senha } = request.body;

    try {
      const [results, fields] = await pool.execute(
        'INSERT INTO usuario (usuario, email, senha) VALUES (?, ?, ?)',
        [usuario, email, senha]
      );

      return response.json({ id: results.insertId });
    } catch (error) {
        console.log(error);
      return response.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const [results, fields] = await pool.execute('DELETE FROM usuario WHERE id = ?', [id]);
      return response.json(results);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { senha, fotoPet } = request.body;

    try {
      const [results, fields] = await pool.execute(
        'UPDATE usuario SET senha = ?, fotoPet = ? WHERE id = ?',
        [senha, fotoPet, id]
      );

      return response.json(results);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
  }
};
