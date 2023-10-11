const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const knex = require("../database");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["id", "nome", "email"]);

    if (novoUsuario && novoUsuario.length > 0) {
      return res.status(201).json(novoUsuario);
    } else {
      return res.status(400).json({ mensagem: "Erro ao cadastrar o usuário" });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const efetuarLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res
        .status(404)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res
        .status(404)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_TOKEN, {
      expiresIn: "10h",
    });

    const { senha: _, ...usuarioLogado } = usuario;

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const obterPerfil = async (req, res) => {
  try {
    return res.json(req.usuario);
  } catch (error) {
    res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

module.exports = {
  cadastrarUsuario,
  efetuarLogin,
  obterPerfil,
};
