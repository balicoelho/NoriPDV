const knex = require("../database");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailExiste = await knex("clientes").where({ email }).first();
    if (emailExiste) {
      return res.status(400).json({ message: "Email já existe" });
    }

    const cpfExiste = await knex("clientes").where({ cpf }).first();
    if (cpfExiste) {
      return res.status(400).json({ message: "CPF já existe" });
    }

    const novoClienteFormatado = {
      nome: nome.trim() ?? null,
      email,
      cpf,
      cep,
      rua: rua ? rua.trim() : null,
      numero: numero ? numero.trim() : null,
      bairro: bairro ? bairro.trim() : null,
      cidade: cidade ? cidade.trim() : null,
      estado: estado ? estado.trim() : null,
    };

    const novoCliente = await knex("clientes")
      .insert(novoClienteFormatado)
      .returning("*");

    return res.status(201).json({ "Cliente cadastrado": novoCliente });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const clienteExiste = await knex("clientes").where({ id }).first();

    if (!clienteExiste) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const emailExiste = await knex("clientes").where({ email }).first();
    if (emailExiste === clienteExiste.email) {
      return res.status(400).json({ message: "Email já existe" });
    }

    const cpfExiste = await knex("clientes").where({ cpf }).first();
    if (cpfExiste === clienteExiste.cpf) {
      return res.status(400).json({ message: "CPF já existe" });
    }

    const clienteFormatado = {
      nome: nome.trim() ?? null,
      email,
      cpf,
      cep,
      rua: rua ? rua.trim() : null,
      numero: numero ? numero.trim() : null,
      bairro: bairro ? bairro.trim() : null,
      cidade: cidade ? cidade.trim() : null,
      estado: estado ? estado.trim() : null,
    };

    const clienteAlterado = await knex("clientes")
      .update(clienteFormatado)
      .where({ id })
      .returning("*");

    return res.status(200).json({ "Cliente alterado": clienteAlterado });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listarClientes = async (req, res) => {
  try {
    const clientes = await knex("clientes");
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
};
