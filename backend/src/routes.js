const express = require('express');
const routes = express.Router();

// Importando os controladores
const DespesasController = require('./controllers/DespesasController');
const UsuariosController = require('./controllers/UsuariosController');


// Rotas para as Despesas
routes.post('/despesas', DespesasController.create);
routes.get('/despesas', DespesasController.read);
routes.delete('/despesas/:id', DespesasController.delete);
routes.post('/despesas/:id', DespesasController.update);

// Rotas para os Usuários
routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.read);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.post('/usuarios/:id', UsuariosController.update);


module.exports = routes;