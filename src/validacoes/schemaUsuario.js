const joi = require('joi');

const schemaCadastrarUsuario = joi.object({
    nome: joi.string().required().messages({
		'any.required': 'O campo nome é obrigatório',
		'string.empty': 'O campo nome não pode ser vazio',
}),

email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
}),

senha: joi.string().min(6).required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha precisa conter, no mínimo, 6 caracteres',
})

});

const schemaLogin = joi.object({
    nome: joi.string().required().messages({
		'any.required': 'O campo nome é obrigatório',
		'string.empty': 'O campo nome não pode ser vazio',
}),

email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
}),

senha: joi.string().min(6).required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha precisa conter, no mínimo, 6 caracteres',
})
});

module.exports = {
    schemaCadastrarUsuario,
    schemaLogin
} 