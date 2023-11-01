const joi = require("joi");

const schemaCadastrarPedido = joi.object({
  cliente_id: joi.number().required().messages({
    "number.base": "O campo cliente_id precisa ser em formato numero",
    "any.required": "O campo cliente_id é obrigatório",
    "string.empty": "O campo cliente_id não pode ser vazio",
  }),
  observacao: joi.string().messages({
    "string.base": "O campo observacao precisa ser em formato texto",
  }),
  pedido_produtos: joi
    .array()
    .required()
    .items(
      joi
        .object()
        .length(2)
        .keys({
          produto_id: joi.number(),
          quantidade_produto: joi.number(),
        })
        .required()
    )
    .messages({
      "array.base": "O campo pedido_produtos precisa ser em formato de array",
      "any.required": "O campo pedido_produtos é obrigatório",
      "array.includesRequiredUnknowns":
        "O campo pedido_produtos precisa conter um objeto com a produto_id e quantidade_produto",
      "object.base": "O campo pedido_produtos precisa conter um objeto",
      "object.unknown":
        "O campo pedido_produtos precisa conter um objeto com as propriedades: produto_id e quantidade_produto",
      "object.length": "Precisa conter 2 propriedades",
      "number.base": "Produto e quantidade precisam ser um número",
    }),
});
module.exports = {
  schemaCadastrarPedido,
};
