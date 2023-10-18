const express = require("express");
const categoria = require("./controladores/categoria");
const usuario = require("./controladores/usuario");
const validaToken = require("./intermediarios/validaToken");
const validacoes = require("./intermediarios/validarCorpoReq");
const {
  schemaCadastrarUsuario,
  schemaLogin,
  schemaAtualizarUsuario,
} = require("./validacoes/schemaUsuario");
const { schemaCadastrarProduto } = require("./validacoes/schemaProduto");
const {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProdutos,
} = require("./controladores/produto");

const rotas = express();

rotas.get("/categoria", categoria.listarCategoria);

rotas.post(
  "/usuario",
  validacoes(schemaCadastrarUsuario),
  usuario.cadastrarUsuario
);

rotas.post("/login", validacoes(schemaLogin), usuario.efetuarLogin);

rotas.use(validaToken);

rotas.get("/usuario", usuario.obterPerfil);

rotas.put(
  "/usuario",
  validacoes(schemaAtualizarUsuario),
  usuario.atualizarPerfil
);

rotas.post("/produto", validacoes(schemaCadastrarProduto), cadastrarProduto);
rotas.put("/produto/:id", validacoes(schemaCadastrarProduto), editarProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);

module.exports = rotas;
