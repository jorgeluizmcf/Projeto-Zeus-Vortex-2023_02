const Despesas = require('../models/DespesasData');


module.exports = {


    async read(request, response) {
        const despesasList = await Despesas.find();

        return response.json(despesasList);

    },



    async create(request, response) {

        //console.log(request.body);

        const {tipoDespesa, valorDespesa} = request.body;

        if (!valorDespesa) {
            return response.status(400).json({ error: "Necessário um valor válido!"});
        }

       // const mesAtual = await Despesas.createWithCurrentMonth(tipoDespesa, valorDespesa)

        const despesasCreated = await Despesas.create({
            tipoDespesa, 
            valorDespesa
        });

        return response.json(despesasCreated);
    },


    async delete(request, response) {
        
        try{
            const { id } = request.params;

            const despesasDeleted = await Despesas.findByIdAndDelete({_id: id});

            return response.json(despesasDeleted);
          
        } catch(error){
            return response.status(401).json('Não foi possivel encontrar o id');
        };
        
    },

    async update(request, response) {
        const { id } = request.params;
        const { tipoDespesa, valorDespesa, mesDespesa, anoDespesa  } = request.body;

        try{ 
            const despesa = await Despesas.findOne({ _id : id});

            if (!despesa) {
                return response.status(404).json({ error: 'Despesa não encontrada' });
            }

            // Atualiza os atributos se os novos valores não forem undefined
            if (tipoDespesa !== undefined) {
                despesa.tipoDespesa = tipoDespesa;
            }

            if (valorDespesa !== undefined) {
                despesa.valorDespesa = valorDespesa;
            }

            if (mesDespesa !== undefined) {
                despesa.mesDespesa = mesDespesa;
            }

            if (anoDespesa !== undefined) {
                despesa.anoDespesa = anoDespesa;
            }

            // Salva as alterações
            await despesa.save();

            return response.json(despesa);
        } catch (error) {
            return response.status(500).json({ error: 'Ocorreu um erro ao atualizar a despesa.' });
        }
    }
}