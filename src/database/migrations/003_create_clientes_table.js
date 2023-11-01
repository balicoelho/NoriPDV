exports.up = function (knex) {
  return knex.schema.createTable("clientes", function (table) {
    table.increments("id");
    table.string("nome").notNullable();
    table.string("email").notNullable().unique();
    table.string("cpf", 11).notNullable().unique();
    table.string("cep", 8);
    table.string("rua", 255);
    table.string("numero", 255);
    table.string("bairro", 255);
    table.string("cidade", 255);
    table.string("estado", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clientes");
};
