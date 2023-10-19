exports.up = function(knex) {
    return knex.schema.table('produtos', function(table) {
      table.renameColumn('categorias_id', 'categoria_id');
    });
};
  
exports.down = function(knex) {
    return knex.schema.table('produtos', function(table) {
      table.renameColumn('categoria_id', 'categorias_id');
    });
};


