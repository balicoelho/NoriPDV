const key = require('../key');
const jwt = require('jsonwebtoken');
const knex = require('../database')

const validaToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const { id } = jwt.verify(token, key);

        const rows = await knex('usuarios').where('id', id)

        if (rows.length === 0) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        const usuario = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        req.usuario = usuario;
        next()

    } catch (error) {
        
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }
}

module.exports = validaToken;