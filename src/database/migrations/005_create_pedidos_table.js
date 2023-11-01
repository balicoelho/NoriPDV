exports.up = function (knex) {
  return knex.schema.createTable("pedidos", function (table) {
    table.increments("id");
    table.number("cliente_id").notNullable();
    table.foreign("cliente_id").references("clientes.id");
    table.string("observacao", 255);
    table.number("valor_total").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pedidos");
};
