exports.seed = async function (knex) {
  await knex("categorias").insert([
    { descricao: "Informática" },
    { descricao: "Celulares" },
    { descricao: "Beleza e Perfumaria" },
    { descricao: "Mercado" },
    { descricao: "Livros e Papelaria" },
    { descricao: "Brinquedos" },
    { descricao: "Moda" },
    { descricao: "Bebê" },
    { descricao: "Games" },
  ]);
};
