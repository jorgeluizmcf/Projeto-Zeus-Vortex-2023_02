const Usuarios = require('../models/UsuariosData');


module.exports = {


    async read(request, response) {
        const UsuariosList = await Usuarios.find();

        return response.json(UsuariosList);

    },



    async create(request, response) {

        const {usuario, email, senha, fotoPet} = request.body;
        const existeEmail = await Usuarios.findOne({
            email : email
        })
        const existeUsuario = await Usuarios.findOne({
            usuario : usuario
        })


        if (existeEmail || existeUsuario){
            return response.status(500).json({error: "E-mail ou usuário já cadastrado."})
        }

        if (!email || !usuario || !senha) {
            return response.status(400).json({ error: "Campos obrigatórios vazios!"});
        }


        const UsuariosCreated = await Usuarios.create({
            usuario, 
            email,
            senha,
            fotoPet
        });

        return response.json(UsuariosCreated);
    },


    async delete(request, response) {
        
        try{
            const { id } = request.params;

            const UsuariosDeleted = await Usuarios.findByIdAndDelete({_id: id});

            return response.json(UsuariosDeleted);
          
        } catch(error){
            return response.status(401).json('Não foi possivel encontrar o id');
        };
        
    },

    async update(request, response) {
        const { id } = request.params;
        const { senha, fotoPet } = request.body;

        try{ 
            const usuario = await Usuarios.findOne({ _id : id});

            if (!usuario) {
                return response.status(404).json({ error: 'usuario não encontrada' });
            }

            // Atualiza os atributos se os novos valores não forem undefined
            if (senha !== undefined) {
                usuario.senha = senha;
            }

            if (fotoPet !== undefined) {
                usuario.fotoPet = fotoPet;
            }

            // Salva as alterações
            await usuario.save();

            return response.json(usuario);
        } catch (error) {
            return response.status(500).json({ error: 'Ocorreu um erro ao atualizar o usuario.' });
        }
    }

}