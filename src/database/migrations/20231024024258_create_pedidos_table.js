exports.up = function(knex) {
    return knex.schema.createTable('pedidos', function(table) {
      table.increments('id').primary();
      table.integer('cliente_id');
      table.foreign('cliente_id').references('clientes.id');
      table.string('observacao');
      table.integer('valor_total').notNullable();
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('pedidos');
};
  