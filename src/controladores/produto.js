const knex = require("../database");
const { uploadFile, excluirArquivo } = require("../storage");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;

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

    if (file) {
      const pasta = novoProduto[0].id;
      const nomeFile = file.originalname.replaceAll(" ", "");
      const arquivo = await uploadFile(
        `${pasta}/${nomeFile}`,
        file.buffer,
        file.mimetype
      );
      const produtoComUrl = await knex("produtos")
        .update({
          produto_imagem: arquivo.url,
        })
        .where({ id: novoProduto[0].id })
        .returning("*");
      return res.status(201).json({ "Produto criado": produtoComUrl[0] });
    }
    return res.status(201).json({ "Produto criado": novoProduto[0] });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  const { file } = req;
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

    if (file) {
      if (produto.produto_imagem !== null) {
        const path = produto.produto_imagem.split(".com/");
        await excluirArquivo(path[1]);
      }

      const pasta = produtoAtualizado[0].id;
      const nomeFile = file.originalname.replaceAll(" ", "");
      const arquivo = await uploadFile(
        `${pasta}/${nomeFile}`,
        file.buffer,
        file.mimetype
      );
      const produtoComUrl = await knex("produtos")
        .update({
          produto_imagem: arquivo.url,
        })
        .where({ id: produtoAtualizado[0].id })
        .returning("*");
      return res.status(201).json({ "Produto criado": produtoComUrl[0] });
    }

    return res.status(201).json({ "Produto atualizado": produtoAtualizado[0] });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    const produtos = await knex("produtos").where((query) => {
      if (categoria_id && typeof categoria_id !== "string") {
        categoria_id.forEach((item) => {
          query.orWhere({ categoria_id: item });
        });
      }
      if (categoria_id && typeof categoria_id === "string") {
        query.orWhere({ categoria_id: categoria_id });
      }
    });

    return res.status(201).json(produtos);
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
    return res.status(201).json(produto);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where({ id }).first();
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const existePedido = await knex("pedido_produtos")
      .where({
        produto_id: id,
      })
      .first();
    if (existePedido) {
      return res.status(400).json({
        message: "Produto não pode ser excluído, pois existe pedido cadastrado",
      });
    }

    if (produto.produto_imagem !== null) {
      const path = produto.produto_imagem.split(".com/");
      await excluirArquivo(path[1]);
    }

    const produtoDeletado = await knex("produtos")
      .where({ id })
      .delete()
      .returning("*");
    return res.status(201).json({ "Produto excluído": produtoDeletado });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProdutos,
  deletarProduto,
};
