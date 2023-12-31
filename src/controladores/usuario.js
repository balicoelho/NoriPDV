const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const knex = require("../database");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await knex("usuarios").where({ email }).first();

    if (emailExiste) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["id", "nome", "email"]);

    if (novoUsuario[0] === undefined) {
      return res.status(400).json({ mensagem: "Erro ao cadastrar o usuário" });
    }

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const efetuarLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_TOKEN, {
      expiresIn: "10h",
    });

    const { senha: _, ...usuarioLogado } = usuario;

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const obterPerfil = (req, res) => {
  return res.status(200).json(req.usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioAtualizado = {};

    if (nome) {
      usuarioAtualizado.nome = nome;
    }

    if (email) {
      const emailExiste = await knex("usuarios").where({ email }).first();

      if (emailExiste && emailExiste.id != req.usuario.id) {
        return res.status(400).json({
          mensagem: `Já existe um usuário cadastrado com este email.`,
        });
      }
      usuarioAtualizado.email = email;
    }

    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      usuarioAtualizado.senha = senhaCriptografada;
    }

    const atualizarUsuario = await knex("usuarios")
      .where({ id: req.usuario.id })
      .update(usuarioAtualizado)
      .returning("*");

    if (!atualizarUsuario) {
      return res.status(400).json({
        mensagem: "Erro ao atualizar o usuário",
      });
    }

    return res
      .status(200)
      .json({ mensagem: `Usuário atualizado com sucesso!` });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarUsuario,
  efetuarLogin,
  obterPerfil,
  atualizarPerfil,
};
