const express = require("express");
const validaToken = require("./intermediarios/validaToken");
const validacoes = require("./intermediarios/validarCorpoReq");
const multer = require('./intermediarios/multer');

const {
  schemaCadastrarUsuario,
  schemaLogin,
  schemaAtualizarUsuario,
} = require("./validacoes/schemaUsuario");

const { schemaCadastrarCliente } = require("./validacoes/schemaCliente");

const { schemaCadastrarProduto } = require("./validacoes/schemaProduto");

const { schemaCadastrarPedido } = require("./validacoes/schemaPedido");

const categoria = require("./controladores/categoria");
const usuario = require("./controladores/usuario");
const cliente = require("./controladores/clientes");
const produto = require("./controladores/produto");
const pedido = require("./controladores/pedidos")


const rotas = express();

rotas.get("/categoria", categoria.listarCategoria);

rotas.post("/usuario", validacoes(schemaCadastrarUsuario), usuario.cadastrarUsuario);

rotas.post("/login", validacoes(schemaLogin), usuario.efetuarLogin);

rotas.use(validaToken);

rotas.get("/usuario", usuario.obterPerfil);
rotas.put("/usuario", validacoes(schemaAtualizarUsuario), usuario.atualizarPerfil);

rotas.post("/produto", validacoes(schemaCadastrarProduto), produto.cadastrarProduto);
rotas.put("/produto/:id", validacoes(schemaCadastrarProduto), produto.editarProduto);
rotas.get("/produto", produto.listarProdutos);
rotas.get("/produto/:id", produto.detalharProduto);
rotas.delete("/produto/:id", produto.excluirProduto);

rotas.post("/produto/imagem/:id", multer.single('produto_imagem'), produto.adicionarImagem);
rotas.delete("/produto/imagem/:id", produto.excluirImagem);

rotas.post("/cliente", validacoes(schemaCadastrarCliente), cliente.cadastrarCliente);
rotas.put("/cliente/:id", validacoes(schemaCadastrarCliente), cliente.editarCliente);
rotas.get("/cliente", cliente.listarCliente);
rotas.get("/cliente/:id", cliente.detalharCliente);
rotas.post("/pedido", validacoes(schemaCadastrarPedido), pedido.cadastrarPedido);
rotas.get("/pedido", pedido.listarPedidos);


module.exports = rotas;
