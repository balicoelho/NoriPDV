const joi = require("joi");

const schemaCadastrarPedido = joi.object({
  cliente_id: joi.number().required().messages({
    "number.base": "O campo cliente_id precisa ser em formato numérico",
    "any.required": "O campo cliente_id é obrigatório",
    "string.empty": "O campo cliente_id não pode ser vazio",
  }),

  observacao: joi.string().optional().messages({
  "string.empty": "O campo observacao não pode ser vazio",
  "string.base": "O campo observacao  precisa ser em formato de string",
  }),

  pedido_produtos: joi.array().items(joi.object({

    produto_id: joi.number().required().messages({
      "number.base": "O campo produto_id precisa ser em formato numérico",
      "any.required": "O campo produto_id é obrigatório (coloque-o dentro do array!)",
      "number.empty": "O campo produto_id não pode ser vazio",
    }),

    quantidade_produto: joi.number().required().messages({
      "number.base": "O campo quantidade_produto precisa ser em formato numérico",
      "any.required": "O campo quantidade_produto é obrigatório (coloque-o dentro do array!)",
      "number.empty": "O campo quantidade_produto não pode ser vazio",
    }),
  })).required().min(1).messages({
    "any.required": "O campo pedido_produtos é obrigatório",
    "array.min": "O campo pedido_produtos deve conter pelo menos um item",
    "array.base": "O campo pedido_produtos precisa ser um array de objetos"
  }),
});


module.exports = {
  schemaCadastrarPedido
};
