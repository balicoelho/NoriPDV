const express = require('express');
const categoria = require('./controladores/categoria');
const usuario = require('./controladores/usuario');
const validaLogin = require('./intermediarios/validaLogin');

const rotas = express();

// rotas.get('/categoria', categoria.listarCategoria);

rotas.post('/usuario', usuario.cadastrarUsuario);

// rotas.post('/login', usuario.efetuarLogin);

// rotas.use(validaLogin);

// rotas.get('/usuario', usuario.obterPerfil);

// rotas.put('/usuario', usuario.atualizarPerfil);

module.exports = rotas;

