const pool = require('../config/dbConfig');

module.exports = {
  async read(request, response) {
    try {
      const [rows, fields] = await pool.execute('SELECT * FROM despesa');
      return response.json(rows);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar as despesas.' });
    }
  },

  async create(request, response) {
    const { tipoDespesa, valorDespesa } = request.body;

    if (!valorDespesa) {
      return response.status(400).json({ error: "Necessário um valor válido!" });
    }

    const numericValue = parseFloat(valorDespesa.replace(',', '.'));

    try {
      const [results, fields] = await pool.execute(
        'INSERT INTO despesa (tipoDespesa, valorDespesa) VALUES (?, ?)',
        [tipoDespesa, numericValue]
      );

      return response.json({ id: results.insertId });
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar a despesa.' });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const [results, fields] = await pool.execute('DELETE FROM despesa WHERE id = ?', [id]);
      return response.json(results);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar a despesa.' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { tipoDespesa, valorDespesa } = request.body;

    try {
      const [results, fields] = await pool.execute(
        'UPDATE despesa SET tipoDespesa = ?, valorDespesa = ? WHERE id = ?',
        [tipoDespesa, valorDespesa, id]
      );

      return response.json(results);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar a despesa.' });
    }
  }
};
