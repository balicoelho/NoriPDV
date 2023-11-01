const knex = require("../database");
const send = require("../email");
const compiladorHtml = require("../utils/compiladorHtml");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const produtos = await knex("produtos");

    //Cadastrar pedido
    const pedidoCadastrado = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total: 0,
      })
      .returning("*");

    //Cadastrar pedido_produtos
    for (const pedido of pedido_produtos) {
      await knex("pedido_produtos").insert({
        pedido_id: pedidoCadastrado[0].id,
        produto_id: pedido.produto_id,
        quantidade_produto: pedido.quantidade_produto,
        valor_produto: produtos.find(
          (produto) => produto.id === pedido.produto_id
        ).valor,
      });
    }

    //Reduzir valor do estoque
    for (const pedido of pedido_produtos) {
      const quantidadeEstoque = await knex("produtos")
        .where({ id: pedido.produto_id })
        .select("quantidade_estoque")
        .first();
      await knex("produtos")
        .where({ id: pedido.produto_id })
        .update({
          quantidade_estoque:
            quantidadeEstoque.quantidade_estoque - pedido.quantidade_produto,
        });
    }

    //Inserir valor total do pedido
    const produtoEpedido = await knex("pedido_produtos").where({
      pedido_id: pedidoCadastrado[0].id,
    });
    const valorPedido = produtoEpedido.reduce((acc, elemento) => {
      return acc + elemento.quantidade_produto * elemento.valor_produto;
    }, 0);

    const inserirValorTotalPedido = await knex("pedidos")
      .where({
        id: pedidoCadastrado[0].id,
      })
      .update({ valor_total: valorPedido })
      .returning("*");

    //Envio do e-mail
    const dadosCliente = await knex("clientes")
      .where({ id: cliente_id })
      .select("nome", "email")
      .first();

    const pedido = inserirValorTotalPedido[0];

    const variaveis = {
      nomecliente: dadosCliente.nome,
      numeropedido: pedido.id,
      observacao,
      valortotal: (pedido.valor_total / 100).toFixed(2),
    };
    const mensagem = await compiladorHtml(
      "./src/templates/index.html",
      variaveis
    );

    const subject = `Pedido ${pedido.id} criado com sucesso: `;

    send(dadosCliente.email, subject, mensagem);

    return res.status(201).json(inserirValorTotalPedido[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const clienteExiste = await knex("clientes")
        .where({ id: cliente_id })
        .first();
      if (!clienteExiste) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }
    }

    const pedidos = await knex("pedidos").where((query) => {
      if (cliente_id) {
        query.where({ cliente_id });
      }
    });
    const pedidoFormatado = [];

    for (const pedido of pedidos) {
      const pedido_produtos = await knex("pedido_produtos").where({
        pedido_id: pedido.id,
      });
      pedidoFormatado.push({ pedido, pedido_produtos });
    }

    return res.status(200).json(pedidoFormatado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { cadastrarPedido, listarPedidos };
