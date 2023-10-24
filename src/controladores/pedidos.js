const knex = require("../database");

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body;

    try {
        const clienteIdExiste = await knex("clientes")
            .where({
                id: cliente_id
            })
            .first();

        if (!clienteIdExiste) {
            return res.status(404).json({ mensagem: "Cliente não esta cadastrado" });
        }

        for (produto of pedido_produtos) {
            const produtoExiste = await knex("produtos")
                .where(
                    { id: produto.produto_id }

                )
                .first()

            if (!produtoExiste) {
                return res.status(404).json({ mensagem: "Produto não existe" });
            }
            if (produtoExiste.quantidade_produto < quantidade_produto) {
                return res.status(404).json({ mensagem: "Não existe quantidade suficiete em estoque " })
            }
        }

        const novoPedido = await knex("pedidos").insert({
            cliente_id,
            observacao: observacao.trim(),
            valor_total: 1
        }).returning("*")

        novoPedido[0].pedido_produtos = []
        
        for (item of pedido_produtos) {
            const novaRelacao = await knex("pedido_produtos").insert({
                produto_id: item.produto_id,
                pedido_id: novoPedido[0].id,
                quantidade_produto: pedido_produtos[0].quantidade_produto,
                valor_produto: 1
            }).returning("*")

            novoPedido[0].pedido_produtos.push(novaRelacao[0])
        }


        return res.status(201).json({novoPedido})
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { cadastrarPedido };