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
    },
    anoDespesa: {
        type: Number,
    }
}, { collection: "Despesas" });

// Middleware para definir o mês no momento da criação
DespesasDataSchema.pre('save', function (next) {
    if (!this.mesDespesa) {
        // Definindo mês e ano no ato do lançamento
        const dataAtual = new Date();
        this.mesDespesa = dataAtual.toLocaleString('default', { month: 'long' });
        this.anoDespesa = dataAtual.toLocaleString('default', { year: 'numeric' });
    }
    next();
});

module.exports = mongoose.model('Despesa', DespesasDataSchema);
