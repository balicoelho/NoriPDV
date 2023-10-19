const knex = require("../database");

const listarCategoria = async (req, res) => {
  try {
    const rows = await knex(`categorias`);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  listarCategoria,
};
