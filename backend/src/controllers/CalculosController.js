//Importando o modelo Despesa
const Despesas = require('../models/Despesa');

module.exports = {
    async calcularTotalMes(request, response) {
        const { mesDespesa, anoDespesa, tipoDespesa } = request.params; // Obtém os parâmetros da rota
    
        try {
            // Filtra as despesas por mês e, opcionalmente, por ano e tipoDespesa
            const pipeline = [];
    
            if (mesDespesa) {
                pipeline.push({
                    $match: {
                        mesDespesa,
                    },
                });
            }
    
            if (anoDespesa) {
                pipeline.push({
                    $match: {
                        anoDespesa: parseInt(anoDespesa), // Convertemos para número
                    },
                });
            }
    
            if (tipoDespesa) {
                pipeline.push({
                    $match: {
                        tipoDespesa: parseInt(tipoDespesa), // Convertemos para número
                    },
                });
            }
    
            pipeline.push({
                $group: {
                    _id: null,
                    total: {
                        $sum: '$valorDespesa',
                    },
                },
            });
    
            const totalDespesas = await Despesas.aggregate(pipeline);
    
            const total = totalDespesas.length > 0 ? totalDespesas[0].total : 0;
    
            const result = {
                mesDespesa,
                anoDespesa,
                tipoDespesa,
                total,
            };
    
            response.json(result);
        } catch (error) {
            return response.status(500).json({ error: 'Ocorreu um erro ao calcular o total das despesas.' });
        }
    }
    
}
