const express = require('express');
const categoria = require('./controladores/categoria');
const usuario = require('./controladores/usuario');
const validaToken = require('./intermediarios/validaToken');
const validacoes = require('./intermediarios/validarCorpoReq');
const {schemaCadastrarUsuario, schemaLogin} = require('./validacoes/schemaUsuario');

const rotas = express();

rotas.get('/categoria', categoria.listarCategoria);

rotas.post('/usuario', validacoes(schemaCadastrarUsuario), usuario.cadastrarUsuario);

rotas.post('/login', validacoes(schemaLogin), usuario.efetuarLogin);

rotas.use(validaToken);

rotas.get('/usuario', usuario.obterPerfil);

rotas.put('/usuario', usuario.atualizarPerfil);

module.exports = rotas;

