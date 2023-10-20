const knex = require("../database");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailExistente = await knex("clientes").where({ email }).first();

    if (emailExistente) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const cpfExistente = await knex("clientes").where({ cpf }).first();

    if (cpfExistente) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o cpf informado.",
      });
    }

    const novoCliente = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .returning("*");

    if (novoCliente[0] === undefined) {
      return res.status(400).json({ mensagem: "Erro ao cadastrar" });
    }

    return res.status(201).json(novoCliente);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarCliente = async (req, res) => {
  try {
    const clientes = await knex(`clientes`);
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes").where({ id }).first();
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const editarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const { id } = req.params;

  try {
    const clienteEncontrado = await knex("clientes").where({ id }).first();
    if (!clienteEncontrado) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const emailEncontrado = await knex("clientes").where({ email }).first();

    if (emailEncontrado && emailEncontrado.id != id) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const cpfEncontrado = await knex("clientes").where({ cpf }).first();

    if (cpfEncontrado && cpfEncontrado.id != id) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o cpf informado.",
      });
    }

    const clienteAtualizado = await knex("clientes")
      .where({ id })
      .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
      .returning("*");

    return res.status(200).json({ "Cliente atualizado": clienteAtualizado[0] });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarCliente,
  detalharCliente,
};
