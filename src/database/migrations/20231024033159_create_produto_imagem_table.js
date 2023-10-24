exports.up = function(knex) {
    return knex.schema.table('produtos', function(table) {
      table.string('produto_imagem');
    });
  };
  
exports.down = function(knex) {
    return knex.schema.table('produtos', function(table) {
        table.dropColumn('produto_imagem');
    });
};
  