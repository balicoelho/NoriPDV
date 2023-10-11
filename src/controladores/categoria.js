const knex = require('../database')

const listarCategoria = async (req, res) => {

    try {
        const rows = await knex(`categorias`);
        return res.json(rows);
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
      }
    };
    
module.exports = {
  listarCategoria
}
