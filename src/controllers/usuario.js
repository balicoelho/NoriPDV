const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../database')
const key = require('../key');

const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha } = req.body

	try {

        const senhaCriptografada = await bcrypt.hash(senha, 10);

		const novoUsuario = await knex("usuarios").insert({
			nome,
			email,
			senha: senhaCriptografada
		}).returning(['id', 'nome', 'email'])

        if (novoUsuario && novoUsuario.length > 0) {
			return res.status(201).json(novoUsuario);
		} else {
			return res.status(400).json({ mensagem: 'Erro ao cadastrar o usuário' });
		}

	} catch (error) {
		return res.status(400).json(error.message)
	}
}

const efetuarLogin = async (req, res) => {
    const { email, senha } = req.body;

    try {

        const usuario = await knex("usuarios").where({email})

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }
    
        const senhaValida = await bcrypt.compare(senha, usuario[0].senha);

        if (!senhaValida) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const token = jwt.sign({ id: usuario[0].id }, key, { expiresIn: '10h' });

        const { senha: _, ...usuarioLogado } = usuario[0];

        return res.json({ usuario: usuarioLogado, token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: `Erro interno do servidor. ${error.message}` });
    }
}


module.exports = {
	cadastrarUsuario, efetuarLogin
}
