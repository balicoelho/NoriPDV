
exports.up = function(knex) {
    return knex.schema.createTable("produtos", function (table) {
        table.increments("id");
        table.string("descricao", 255);
        table.integer("quantidade_estoque");
        table.integer("valor");
        table.integer('categorias_id');
        table.foreign('categorias_id').references('categorias.id');
      });
};


exports.down = function(knex) {
    return knex.schema.dropTable("produtos");
};


 