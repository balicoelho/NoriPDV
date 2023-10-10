const validarRequisicao = joiSchema => async (res, req, next) => {
    
    try {
        await joiSchema.validateAsync(req.body)
        next()
        
    } catch (error) {
        return res.status(400).json({menssagem: error.message})
    }
}

module.exports = validarRequisicao;