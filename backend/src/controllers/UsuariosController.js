// src/controllers/UsuariosController.js

const pool = require('../config/dbConfig');

module.exports = {
  async read(request, response) {
    try {
      const [rows, fields] = await pool.execute('SELECT * FROM usuario');
      console.log('Usuários buscados:', rows);
      return response.json(rows);
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
      return response.status(500).json({ error: 'Erro ao buscar os usuários.' });
    }
  },

  async create(request, response) {
    const { nome, email, senha } = request.body;

    console.log('Dados recebidos para criar usuário:', { nome, email, senha });

    try {
      const [results, fields] = await pool.execute(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha]
      );

      console.log('Usuário criado com ID:', results.insertId);
      return response.json({ id: results.insertId });
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
      return response.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    console.log('ID do usuário para deletar:', id);

    try {
      const [results, fields] = await pool.execute('DELETE FROM usuario WHERE id = ?', [id]);
      console.log('Resultado da exclusão:', results);

      if (results.affectedRows === 0) {
        return response.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return response.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      return response.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, email, senha } = request.body;

    console.log('Dados recebidos para atualizar usuário:', { id, nome, email, senha });

    const updateFields = [];
    const updateValues = [];

    if (nome) {
      updateFields.push('nome = ?');
      updateValues.push(nome);
    }

    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }

    if (senha) {
      updateFields.push('senha = ?');
      updateValues.push(senha);
    }

    updateValues.push(id);

    if (updateFields.length === 0) {
      return response.status(400).json({ error: 'Nenhum campo para atualizar.' });
    }

    const sql = `UPDATE usuario SET ${updateFields.join(', ')} WHERE id = ?`;

    try {
      const [results, fields] = await pool.execute(sql, updateValues);
      console.log('Usuário atualizado:', results);

      if (results.affectedRows === 0) {
        return response.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return response.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      return response.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
  }
};
