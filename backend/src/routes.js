const express = require('express');
const routes = express.Router();
const DespesasController = require('./controllers/DespesasController');
const UsuariosController = require('./controllers/UsuariosController');
const CalculosController = require('./controllers/CalculosController');

routes.post('/despesas', DespesasController.create);
routes.get('/despesas', DespesasController.read);
routes.delete('/despesas/:id', DespesasController.delete);
routes.post('/despesas/:id', DespesasController.update);

routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.read);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.post('/usuarios/:id', UsuariosController.update);

routes.get('/calcular-total-mes/:mesDespesa/:anoDespesa?', CalculosController.calcularTotalMes);
routes.get('/calcular-total-mes/:mesDespesa/:anoDespesa?/:tipoDespesa', CalculosController.calcularTotalMes);

module.exports = routes;
