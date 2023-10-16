const jwt = require("jsonwebtoken");
const knex = require("../database");

const validaToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.SENHA_TOKEN);

    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    const { senha: _, ...usuario } = usuarioExiste;

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

module.exports = validaToken;
