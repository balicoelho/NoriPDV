exports.up = function (knex) {
    return knex.schema.alterTable('pedidos', function (table) {
      table.integer('valor_total').nullable();
    });
};
  
  exports.down = function (knex) {
    return knex.schema.alterTable('pedidos', function (table) {
      table.integer('valor_total').notNullable().alter();
    });
};
  