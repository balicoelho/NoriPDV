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

const { schemaCadastrarCliente } = require("./validacoes/schemaCliente");
const { schemaCadastrarProduto } = require("./validacoes/schemaProduto");
const { schemaCadastrarPedido } = require("./validacoes/schemaPedido");

const {
  cadastrarCliente,
  listarCliente,
  detalharCliente,
  editarCliente,
} = require("./controladores/clientes");

const {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProdutos,
  excluirProduto,
} = require("./controladores/produto");

const { cadastrarPedido } = require("./controladores/pedidos")

const rotas = express();

rotas.get("/categoria", categoria.listarCategoria);

rotas.post("/usuario", validacoes(schemaCadastrarUsuario), usuario.cadastrarUsuario);

rotas.post("/login", validacoes(schemaLogin), usuario.efetuarLogin);

rotas.use(validaToken);

rotas.get("/usuario", usuario.obterPerfil);
rotas.put("/usuario", validacoes(schemaAtualizarUsuario), usuario.atualizarPerfil);

rotas.post("/produto", validacoes(schemaCadastrarProduto), cadastrarProduto);
rotas.put("/produto/:id", validacoes(schemaCadastrarProduto), editarProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", excluirProduto);

rotas.post("/cliente", validacoes(schemaCadastrarCliente), cadastrarCliente);
rotas.put("/cliente/:id", validacoes(schemaCadastrarCliente), editarCliente);
rotas.get("/cliente", listarCliente);
rotas.get("/cliente/:id", detalharCliente);

rotas.post("pedido", validacoes(schemaCadastrarPedido), cadastrarPedido)

module.exports = rotas;
