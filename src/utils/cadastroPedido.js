const knex = require("../database");

const clienteExiste = async (req, res, next) => {
  const { cliente_id } = req.body;

  try {
    const clienteExiste = await knex("clientes")
      .where({ id: cliente_id })
      .first();
    if (!clienteExiste) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const produtosExistem = async (req, res, next) => {
  const { pedido_produtos } = req.body;
  try {
    for (const pedido of pedido_produtos) {
      const produto = await knex("produtos")
        .where({
          id: pedido.produto_id,
        })
        .first();
      if (!produto) {
        return res
          .status(404)
          .json({ message: `Produto ${pedido.produto_id} não encontrado` });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const produtosDuplicados = async (req, res, next) => {
  const { pedido_produtos } = req.body;

  for (const pedido1 of pedido_produtos) {
    let count = 0;
    for (const pedido2 of pedido_produtos) {
      if (pedido1.produto_id === pedido2.produto_id) {
        count++;
      }
      if (count > 1) {
        return res.status(400).json({
          message: `Produto ${pedido1.produto_id} duplicado no pedido`,
        });
      }
    }
  }
  next();
};

const estoqueDisponivel = async (req, res, next) => {
  const { pedido_produtos } = req.body;
  try {
    for (const pedido of pedido_produtos) {
      const estoque = await knex("produtos")
        .where({
          id: pedido.produto_id,
        })
        .select("quantidade_estoque");
      if (estoque < pedido.quantidade_produto) {
        return res.status(404).json({
          message: `Produto ${pedido.produto_id} sem estoque disponível. Apenas ${quantidadeEstoque} disponível`,
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  produtosExistem,
  clienteExiste,
  produtosDuplicados,
  estoqueDisponivel,
};
