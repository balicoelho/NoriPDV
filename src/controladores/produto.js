const knex = require("../database");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const categoriaExiste = await knex("categorias")
      .where({
        id: categoria_id,
      })
      .first();

    if (!categoriaExiste) {
      return res.status(404).json({ message: "Categoria não existe" });
    }
    const novoProduto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    return res.status(201).json({ "Produto criado": novoProduto[0] });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where({ id }).first();
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const categoriaExiste = await knex("categorias")
      .where({
        id: categoria_id,
      })
      .first();

    if (!categoriaExiste) {
      return res.status(404).json({ message: "Categoria não existe" });
    }

    const produtoAtualizado = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .where({ id })
      .returning("*");

    return res.status(201).json({ "Produto atualizado": produtoAtualizado[0] });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    const produtos = await knex("produtos").where((query) => {
      if (categoria_id && categoria_id.length > 1) {
        categoria_id.forEach((item) => {
          query.orWhere({ categoria_id: item });
        });
      }
      if (categoria_id && categoria_id.length === 1) {
        query.orWhere({ categoria_id: categoria_id });
      }
    });

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where({ id }).first();
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProdutos,
};
