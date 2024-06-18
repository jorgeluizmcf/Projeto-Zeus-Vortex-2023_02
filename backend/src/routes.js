const express = require('express');
const routes = express.Router();
const DespesasController = require('./controllers/DespesasController');
const UsuariosController = require('./controllers/UsuariosController');
const PetController = require('./controllers/PetController');

routes.get('/', (req, res) => {
    res.send('Bem-vindo ao PataFinanceira!');
  });

routes.post('/despesas', DespesasController.create);
routes.get('/despesas', DespesasController.read);
routes.delete('/despesas/:id', DespesasController.delete);
routes.post('/despesas/:id', DespesasController.update);

routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.read);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.post('/usuarios/:id', UsuariosController.update);

routes.post('/pets', PetController.create);
routes.get('/pets', PetController.read);
routes.delete('/pets/:id', PetController.delete);
routes.post('/pets/:id', PetController.update);

module.exports = routes;
