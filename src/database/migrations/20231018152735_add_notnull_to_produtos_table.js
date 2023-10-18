
exports.up = function (knex) {
    return knex.schema.alterTable('produtos', function (table) {
        table.string("descricao", 255).notNullable().alter();
        table.integer("quantidade_estoque").notNullable().alter();
        table.integer("valor").notNullable().alter();
        table.integer('categorias_id').notNullable().alter();
    })
}

exports.down = function (knex) {
    return knex.schema.altertable("produtos", function (table) {
        table.string("descricao", 255).nullable().alter();
        table.integer("quantidade_estoque").nullable().alter();
        table.integer("valor").nullable().alter();
        table.integer('categorias_id').nullable().alter();
    });
};