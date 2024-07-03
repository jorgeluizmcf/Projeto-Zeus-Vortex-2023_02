const pool = require("../config/dbConfig");

module.exports = {
  async read(request, response) {
    const { id_usuario, id_pet, date } = request.query;
  
    let query = "SELECT * FROM despesa WHERE id_usuario = ? AND YEAR(data) = ? AND MONTH(data) = ?";
    let params = [id_usuario];
  
    // Verifique se a data está presente e extraia o ano e o mês
    if (date) {
      const parsedDate = dayjs(date);
      const year = parsedDate.year();
      const month = parsedDate.month() + 1; // dayjs months are 0-based, SQL months are 1-based
      params.push(year, month);
    } else {
      return response.status(400).json({ error: "Data is required" });
    }
  
    // Adicione a condição id_pet se estiver presente
    if (id_pet) {
      query += " AND id_pet = ?";
      params.push(id_pet);
    }
  
    try {
      const [rows, fields] = await pool.execute(query, params);
      return response.json(rows);
    } catch (error) {
      console.error("Erro ao buscar as despesas:", error);
      return response.status(500).json({ error: "Erro ao buscar as despesas." });
    }
  },

  async create(request, response) {
    const { tipoDespesa, valorDespesa, data, id_usuario, id_pet } =
      request.body;

    if (!valorDespesa) {
      return response
        .status(400)
        .json({ error: "Necessário um valor válido!" });
    }

    const numericValue = parseFloat(valorDespesa.replace(",", "."));

    try {
      const [results, fields] = await pool.execute(
        "INSERT INTO despesa (tipoDespesa, valorDespesa, data, id_usuario, id_pet) VALUES (?, ?, ?, ?, ?)",
        [tipoDespesa, numericValue, data, id_usuario, id_pet]
      );

      console.log("Despesa criada com ID:", results.insertId);
      return response.json({ id: results.insertId });
    } catch (error) {
      console.error("Erro ao criar a despesa:", error);
      return response.status(500).json({ error: "Erro ao criar a despesa." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const [results, fields] = await pool.execute(
        "DELETE FROM despesa WHERE id = ?",
        [id]
      );

      if (results.affectedRows === 0) {
        return response.status(404).json({ error: "Despesa não encontrada." });
      }

      console.log("Despesa deletada com ID:", id);
      return response.json({ message: "Despesa deletada com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar a despesa:", error);
      return response.status(500).json({ error: "Erro ao deletar a despesa." });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { tipoDespesa, valorDespesa, data, id_usuario, id_pet } =
      request.body;

    const numericValue = parseFloat(valorDespesa.replace(",", "."));

    try {
      const [results, fields] = await pool.execute(
        "UPDATE despesa SET tipoDespesa = ?, valorDespesa = ?, data = ?, id_usuario = ?, id_pet = ? WHERE id = ?",
        [tipoDespesa, numericValue, data, id_usuario, id_pet, id]
      );

      if (results.affectedRows === 0) {
        return response.status(404).json({ error: "Despesa não encontrada." });
      }

      console.log("Despesa atualizada com ID:", id);
      return response.json({ message: "Despesa atualizada com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar a despesa:", error);
      return response
        .status(500)
        .json({ error: "Erro ao atualizar a despesa." });
    }
  },
};
