const joi = require("joi");

const schemaCadastrarProduto = joi.object({
  descricao: joi.string().required().trim().messages({
    "string.base": "O campo descricao precisa ser em formato texto",
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao não pode ser vazio",
  }),
  quantidade_estoque: joi.number().integer().min(0).required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório",
    "number.integer":
      "O campo quantidade_estoque precisa ser um número inteiro",
    "number.min": "O campo quantidade_estoque precisa ser um número positivo",
  }),
  valor: joi.number().integer().required().positive().messages({
    "any.required": "O campo valor é obrigatório",
    "number.integer": "O campo valor precisa ser um número inteiro",
    "number.positive": "O campo valor precisa ser um número positivo",
  }),
  categoria_id: joi.number().integer().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id precisa ser um número",
    "number.integer": "O campo categoria_id precisa ser um número inteiro",
  }),
});
module.exports = {
  schemaCadastrarProduto,
};
