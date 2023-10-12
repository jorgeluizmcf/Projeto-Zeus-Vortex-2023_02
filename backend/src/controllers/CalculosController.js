//Importando o modelo Despesa
const Despesas = require('../models/DespesasData');

module.exports = {
    async calcularTotalMes(request, response) {
        const { mesDespesa } = request.params; // Obtém o mês do parâmetro da rota

        try {
            // Encontre todas as despesas do mês especificado
            const despesasDoMes = await Despesas.find({ mesDespesa });

            console.log('recebeu mês ' + mesDespesa + ' como parâmetro');
            console.log(despesasDoMes);
            // Inicializa o total como 0
            let total = 0;
            console.log('definiu variavel total');

            // Percorre as despesas e soma seus valores
            despesasDoMes.forEach((Despesas) => {
                total += Despesas.valorDespesa;
                console.log('total: ' + total);
            });

            response.json({ mesDespesa, total });
        } catch (error) {
            return response.status(500).json({ error: 'Ocorreu um erro ao calcular o total do mês.' });
        }
    }
}
