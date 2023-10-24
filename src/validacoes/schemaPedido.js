const joi = require("joi");

const schemaCadastrarPedido = joi.object({
  cliente_id: joi.number().required().messages({
    "number.base": "O campo cliente_id precisa ser em formato numérico",
    "any.required": "O campo cliente_id é obrigatório",
    "string.empty": "O campo cliente_id não pode ser vazio",
  }),

  pedido_produtos: joi.array().items(joi.object({

    produto_id: joi.string().required().messages({
      "string.base": "O campo produto_id precisa ser em formato numérico",
      "any.required": "O campo produto_id é obrigatório",
      "string.empty": "O campo produto_id não pode ser vazio",
    }),

    quantidade_produto: joi.string().required().messages({
      "string.base": "O campo quantidade_produto precisa ser em formato numérico",
      "any.required": "O campo quantidade_produto é obrigatório",
      "string.empty": "O campo quantidade_produto não pode ser vazio",
    }),
  })).required().min(1).messages({
    "any.required": "O campo pedido_produtos é obrigatório",
    "array.min": "O campo pedido_produtos deve conter pelo menos um item",
  }),
});


module.exports = {
  schemaCadastrarPedido
};
