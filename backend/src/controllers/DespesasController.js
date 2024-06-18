const pool = require('../config/dbConfig');

module.exports = {
  async read(request, response) {
    try {
      const [rows, fields] = await pool.execute('SELECT * FROM despesa');
      return response.json(rows);
    } catch (error) {
      console.error('Erro ao buscar as despesas:', error);
      return response.status(500).json({ error: 'Erro ao buscar as despesas.' });
    }
  },

  async create(request, response) {
    const { tipoDespesa, valorDespesa, data, id_usuario, id_pet } = request.body;

    if (!valorDespesa) {
      return response.status(400).json({ error: "Necessário um valor válido!" });
    }

    const numericValue = parseFloat(valorDespesa.replace(',', '.'));

    try {
      const [results, fields] = await pool.execute(
        'INSERT INTO despesa (tipoDespesa, valorDespesa, data, id_usuario, id_pet) VALUES (?, ?, ?, ?, ?)',
        [tipoDespesa, numericValue, data, id_usuario, id_pet]
      );

      console.log('Despesa criada com ID:', results.insertId);
      return response.json({ id: results.insertId });
    } catch (error) {
      console.error('Erro ao criar a despesa:', error);
      return response.status(500).json({ error: 'Erro ao criar a despesa.' });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const [results, fields] = await pool.execute('DELETE FROM despesa WHERE id = ?', [id]);
      
      if (results.affectedRows === 0) {
        return response.status(404).json({ error: 'Despesa não encontrada.' });
      }

      console.log('Despesa deletada com ID:', id);
      return response.json({ message: 'Despesa deletada com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar a despesa:', error);
      return response.status(500).json({ error: 'Erro ao deletar a despesa.' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { tipoDespesa, valorDespesa, data, id_usuario, id_pet } = request.body;

    const numericValue = parseFloat(valorDespesa.replace(',', '.'));

    try {
      const [results, fields] = await pool.execute(
        'UPDATE despesa SET tipoDespesa = ?, valorDespesa = ?, data = ?, id_usuario = ?, id_pet = ? WHERE id = ?',
        [tipoDespesa, numericValue, data, id_usuario, id_pet, id]
      );

      if (results.affectedRows === 0) {
        return response.status(404).json({ error: 'Despesa não encontrada.' });
      }

      console.log('Despesa atualizada com ID:', id);
      return response.json({ message: 'Despesa atualizada com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar a despesa:', error);
      return response.status(500).json({ error: 'Erro ao atualizar a despesa.' });
    }
  }
};
