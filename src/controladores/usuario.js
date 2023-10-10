const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../database')

const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha } = req.body

	try {

        const senhaCriptografada = await bcrypt.hash(senha, 10);

		const novoUsuario = await knex("usuarios").insert({
			nome,
			email,
			senha: senhaCriptografada
		}).returning('*')

        if (novoUsuario && novoUsuario.length > 0) {
			return res.status(201).json(novoUsuario);
		} else {
			return res.status(400).json({ mensagem: 'Erro ao cadastrar o usuário' });
		}

	} catch (error) {
		return res.status(400).json(error.message)
	}
}

module.exports = {
	cadastrarUsuario
}
