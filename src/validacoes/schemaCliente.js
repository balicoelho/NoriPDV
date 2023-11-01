const joi = require("joi");

const schemaCadastrarCliente = joi.object({
  nome: joi.string().required().trim().messages({
    "string.base": "O campo nome precisa ser em formato texto",
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome não pode ser vazio",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.email": "Email inválido",
  }),
  cpf: joi.string().min(11).max(11).required().messages({
    "string.base": "O campo cpf precisa ser em formato texto",
    "any.required": "O campo cpf é obrigatório",
    "string.max": "O campo cpf deve ter 11 numeros, sem caracteres especiais",
    "string.min": "O campo cpf deve ter 11 numeros, sem caracteres especiais",
  }),
  cep: joi.string().min(8).max(8).messages({
    "string.base": "O campo cep precisa ser em formato texto",
    "string.max": "O campo cep deve ter 8 numeros, sem caracteres especiais",
    "string.min": "O campo cep deve ter 8 numeros, sem caracteres especiais",
  }),
  rua: joi.string().trim().messages({
    "string.base": "O campo rua precisa ser em formato texto",
    "string.empty": "O campo rua não pode ser vazio",
  }),
  numero: joi.string().trim().messages({
    "string.base": "O campo numero precisa ser em formato texto",
    "string.empty": "O campo numero não pode ser vazio",
  }),
  bairro: joi.string().trim().messages({
    "string.base": "O campo bairro precisa ser em formato texto",
    "string.empty": "O campo bairro não pode ser vazio",
  }),
  cidade: joi.string().trim().messages({
    "string.base": "O campo cidade precisa ser em formato texto",
    "string.empty": "O campo cidade não pode ser vazio",
  }),
  estado: joi.string().trim().messages({
    "string.base": "O campo estado precisa ser em formato texto",
    "string.empty": "O campo estado não pode ser vazio",
  }),
});
module.exports = {
  schemaCadastrarCliente,
};
