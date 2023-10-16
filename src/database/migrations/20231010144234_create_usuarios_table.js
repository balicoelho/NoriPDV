exports.up = function (knex) {
  return knex.schema.createTable("usuarios", function (table) {
    table.increments("id");
    table.string("nome", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("senha", 255).notNullable();
    table;
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
