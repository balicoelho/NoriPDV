const express = require("express");
const multer = require("./multer");
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
  deletarProduto,
} = require("./controladores/produto");
const {
  cadastrarCliente,
  editarCliente,
  detalharCliente,
  listarClientes,
} = require("./controladores/cliente");
const { schemaCadastrarCliente } = require("./validacoes/schemaCliente");
const { cadastrarPedido, listarPedidos } = require("./controladores/pedido");
const { schemaCadastrarPedido } = require("./validacoes/schemaPedido");
const validacaoPedido = require("./utils/cadastroPedido");

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

rotas.post(
  "/produto",
  multer.single("produto_imagem"),
  validacoes(schemaCadastrarProduto),
  cadastrarProduto
);
rotas.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  validacoes(schemaCadastrarProduto),
  editarProduto
);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", deletarProduto);

rotas.post("/cliente", validacoes(schemaCadastrarCliente), cadastrarCliente);
rotas.put("/cliente/:id", validacoes(schemaCadastrarCliente), editarCliente);
rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id", detalharCliente);

rotas.post(
  "/pedido",
  validacoes(schemaCadastrarPedido),
  validacaoPedido.clienteExiste,
  validacaoPedido.produtosExistem,
  validacaoPedido.produtosDuplicados,
  validacaoPedido.estoqueDisponivel,
  cadastrarPedido
);

rotas.get("/pedido", listarPedidos);
module.exports = rotas;
