exports.up = function (knex) {
  return knex.schema.createTable("pedido_produtos", function (table) {
    table.increments("id");
    table.number("pedido_id").notNullable();
    table.foreign("pedido_id").references("pedidos.id");
    table.number("produto_id").notNullable();
    table.foreign("produto_id").references("produtos.id");
    table.number("quantidade_produto").notNullable();
    table.number("valor_produto").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pedido_produtos");
};
