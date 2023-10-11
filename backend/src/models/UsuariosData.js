const mongoose = require('mongoose');

const UsuariosDataSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    fotoPet: {
        type: Buffer // tipo Buffer para a imagem
    }
}, { collection: "Usuarios" });

module.exports = mongoose.model('Usuario', UsuariosDataSchema);
