exports.up = function (knex) {
  return knex.schema.createTable("produtos", function (table) {
    table.increments("id");
    table.string("descricao", 255).notNullable();
    table.number("quantidade_estoque").notNullable();
    table.number("valor").notNullable();
    table.number("categoria_id").notNullable();
    table.foreign("categoria_id").references("categorias.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("produtos");
};
