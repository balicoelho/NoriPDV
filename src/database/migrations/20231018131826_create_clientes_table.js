
exports.up = function (knex) {
    return knex.schema.createTable("clientes", function (table) {
        table.increments("id");
        table.string("nome", 255).notNullable();
        table.string("email", 255).unique().notNullable();
        table.string("cpf", 11).unique().notNullable();
        table.string('cep', 10);
        table.string('rua', 100);
        table.string('numero', 100);
        table.string('bairro', 100);
        table.string('cidade', 100);
        table.string('estado', 2);

    });
};


exports.down = function (knex) {
    return knex.schema.dropTable("clientes");
};