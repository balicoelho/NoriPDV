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

        const produtos = [];

        for (produto of pedido_produtos) {
            const produtoExiste = await knex("produtos")
                .where(
                    { id: produto.produto_id }

                )
                .first()

            if (!produtoExiste) {
                return res.status(404).json({ mensagem: "Produto não existe" });
            }
         
            if (produtoExiste.quantidade_estoque < produto.quantidade_produto) {
                return res.status(404).json({ mensagem: "Não existe quantidade suficiete em estoque " })
            }
          
            produtoExiste.quantidade_pedido = produto.quantidade_produto
            produtos.push(produtoExiste)
        }


        const novoPedido = await knex("pedidos").insert({
            cliente_id,
            observacao: observacao.trim(),
            valor_total: 1
        }).returning("*")

        novoPedido[0].pedido_produtos = []

        let valorTotal = 0;

        for (item of produtos) {
      
            const novaRelacao = await knex("pedido_produtos").insert({
                produto_id: item.id,
                pedido_id: novoPedido[0].id,
                quantidade_produto: item.quantidade_pedido,
                valor_produto: item.valor
            }).returning("*")
            valorTotal += item.quantidade_pedido * item.valor
            novoPedido[0].pedido_produtos.push(novaRelacao[0])
        }
        novoPedido[0].valor_total = valorTotal
        const update = await knex("pedidos").where({id:novoPedido[0].id}).update({
            valor_total: valorTotal
        })

        return res.status(201).json({ "Pedido criado": novoPedido })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { cadastrarPedido };