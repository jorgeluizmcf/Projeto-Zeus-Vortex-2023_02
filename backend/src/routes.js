// src/routes.js
const express = require('express');
const routes = express.Router();
const DespesasController = require('./controllers/DespesasController');
const UsuariosController = require('./controllers/UsuariosController');
const PetController = require('./controllers/PetController');
const AuthController = require('./controllers/AuthController');
const { authenticateToken } = require('./middleware');

routes.get('/', (req, res) => {
  res.send('Bem-vindo ao PataFinanceira!');
});

routes.post('/despesas', authenticateToken, DespesasController.create);
routes.get('/despesas', authenticateToken, DespesasController.read);
routes.delete('/despesas/:id', authenticateToken, DespesasController.delete);
routes.post('/despesas/:id', authenticateToken, DespesasController.update);

routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', authenticateToken, UsuariosController.read);
routes.delete('/usuarios/:id', authenticateToken, UsuariosController.delete);
routes.post('/usuarios/:id', authenticateToken, UsuariosController.update);

routes.post('/pets', authenticateToken, PetController.create);
routes.get('/pets', authenticateToken, PetController.read);
routes.delete('/pets/:id', authenticateToken, PetController.delete);
routes.post('/pets/:id', authenticateToken, PetController.update);

// Rota de autenticação
routes.post('/auth/login', AuthController.login);

module.exports = routes;
