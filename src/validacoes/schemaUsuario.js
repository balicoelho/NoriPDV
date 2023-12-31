const joi = require("joi");

const schemaCadastrarUsuario = joi.object({
  nome: joi.string().required().messages({
    "string.base": "O campo nome precisa ser em formato texto",
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode ser vazio",
  }),

  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email não pode ser vazio",
  }),

  senha: joi.string().min(6).required().messages({
    "string.base": "O campo senha precisa ser em formato texto",
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha não pode ser vazio",
    "string.min": "A senha precisa conter, no mínimo, 6 caracteres",
  }),
});

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email não pode ser vazio",
  }),

  senha: joi.string().min(6).required().messages({
    "string.base": "O campo senha precisa ser em formato texto",
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha não pode ser vazio",
    "string.min": "A senha precisa conter, no mínimo, 6 caracteres",
  }),
});

const schemaAtualizarUsuario = joi
  .object({
    nome: joi.string().messages({
      "string.base": "O campo nome precisa ser em formato texto",
      "string.empty": "O campo nome não pode ser vazio",
    }),

    email: joi.string().email().messages({
      "string.empty": "O campo email não pode ser vazio",
      "string.email": "O campo email precisa ter um formato válido",
    }),

    senha: joi.string().min(6).messages({
      "string.base": "O campo senha precisa ser em formato texto",
      "string.min": "A senha precisa conter, no mínimo, 6 caracteres",
      "string.empty": "O campo senha não pode ser vazio",
    }),
  })
  .or("nome", "email", "senha")
  .messages({
    "object.missing":
      "Pelo menos um dos campos (nome, email ou senha) é obrigatório.",
  });

module.exports = {
  schemaCadastrarUsuario,
  schemaLogin,
  schemaAtualizarUsuario,
};
