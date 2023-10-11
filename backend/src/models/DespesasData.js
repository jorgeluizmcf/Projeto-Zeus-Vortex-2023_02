const mongoose = require('mongoose');

const DespesasDataSchema = new mongoose.Schema({
    tipoDespesa: {
        type: Number,
        required: true // Campo obrigatório
    },
    valorDespesa: {
        type: Number,
        required: true
    },
    mesDespesa: {
        type: String,
    }
}, { collection: "Despesas" });

// Middleware para definir o mês no momento da criação
DespesasDataSchema.pre('save', function (next) {
    if (!this.mesDespesa) {
        // Se o campo mesDespesa ainda não tiver sido definido, defina-o com o mês atual
        const dataAtual = new Date();
        this.mesDespesa = dataAtual.toLocaleString('default', { month: 'long' });
    }
    next();
});

module.exports = mongoose.model('Despesa', DespesasDataSchema);
