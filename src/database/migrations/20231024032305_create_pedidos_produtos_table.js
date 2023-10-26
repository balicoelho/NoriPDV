exports.up = function(knex) {
    return knex.schema.createTable('pedido_produtos', function(table) {
      table.increments('id');
      table.integer('pedido_id');
      table.foreign('pedido_id').references('pedidos.id');
      table.integer('produto_id').notNullable();
      table.foreign('produto_id').references('produtos.id');
      table.integer('quantidade_produto').notNullable();
      table.integer('valor_produto').notNullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('pedido_produtos');
};
  