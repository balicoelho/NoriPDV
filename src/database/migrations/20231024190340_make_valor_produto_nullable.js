exports.up = function (knex) {
    return knex.schema.alterTable('pedido_produtos', function (table) {
      table.integer('valor_produto').nullable();
    });
};
  
  exports.down = function (knex) {
    return knex.schema.alterTable('pedido_produtos', function (table) {
      table.integer('valor_produto').notNullable().alter();
    });
};
  