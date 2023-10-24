const cadastrarPedido = (req, res) => {
    const { cliente_id, observacao, pedido_produtos, produto_id,quantidade_produtos } = req.body;

    try {
        console.log('chegou')
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { cadastrarPedido };