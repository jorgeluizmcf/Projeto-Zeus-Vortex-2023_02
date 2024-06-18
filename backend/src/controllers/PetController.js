const Pet = require('../models/Pet');

module.exports = {
  async create(request, response) {
    const { nome, data_nascimento, tipo, raca, foto, id_usuario } = request.body;

    if (!nome || !data_nascimento || !tipo || !raca || !id_usuario) {
      return response.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const newPet = {
        nome,
        data_nascimento,
        tipo,
        raca,
        foto,
        id_usuario
      };

      const petId = await Pet.create(newPet);

      return response.json({ id: petId });
    } catch (error) {
      console.error('Erro ao criar o pet:', error);
      return response.status(500).json({ error: 'Erro ao criar o pet.' });
    }
  },

  async read(request, response) {
    try {
      const pets = await Pet.findAll();

      return response.json(pets);
    } catch (error) {
      console.error('Erro ao buscar os pets:', error);
      return response.status(500).json({ error: 'Erro ao buscar os pets.' });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, data_nascimento, tipo, raca, foto, id_usuario } = request.body;

    if (!nome || !data_nascimento || !tipo || !raca || !id_usuario) {
      return response.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const updatedPet = {
        id,
        nome,
        data_nascimento,
        tipo,
        raca,
        foto,
        id_usuario
      };

      await Pet.update(updatedPet);

      return response.json({ message: 'Pet atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar o pet:', error);
      return response.status(500).json({ error: 'Erro ao atualizar o pet.' });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Pet.delete(id);

      return response.json({ message: 'Pet deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar o pet:', error);
      return response.status(500).json({ error: 'Erro ao deletar o pet.' });
    }
  }
};
