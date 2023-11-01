exports.up = function (knex) {
  return knex.schema.table("produtos", function (table) {
    table.string("produto_imagem", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.table("produtos", function (table) {
    table.dropColumn("produto_imagem");
  });
};
