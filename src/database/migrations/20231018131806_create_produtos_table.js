
exports.up = function(knex) {
    return knex.schema.createTable("produtos", function (table) {
        table.increments("id");
        table.string("descricao", 255).notNullable();
        table.integer("quantidade_estoque").notNullable();
        table.integer("valor").notNullable();
        table.integer('categorias_id').notNullable();
        table.foreign('categorias_id').references('categorias.id');
      });
};




exports.down = function(knex) {
    return knex.schema.dropTable("produtos");
};


 