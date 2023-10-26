const knex = require("../database");
const {enviarEmail} = require('../servicos/nodemailer');

const cadastrarPedido = async (req, res) => {

    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body;

    try {
        const clienteIdExiste = await knex("clientes")
            .where({id: cliente_id})
            .first();

        if (!clienteIdExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado" });
        }

        const itensPedido = [];

        for (itemPedido of pedido_produtos) {

            const produto = await knex("produtos")
                .where({id: itemPedido.produto_id})
                .first();

            if (!produto) {
                return res.status(404).json({ mensagem: `Produto ${itemPedido.produto_id} não encontrado`});
            }
         
            if (produto.quantidade_estoque < itemPedido.quantidade_produto) {
                return res.status(404).json({ mensagem: `Não existe quantidade suficiente do produto ${produto.id} em estoque` });
            }
          
            produto.quantidade_pedido = itemPedido.quantidade_produto;
            itensPedido.push(produto);
        }

        const novoPedido = await knex("pedidos").insert({
            cliente_id,
            observacao,
            valor_total: 0
        }).returning("*");

        novoPedido[0].pedido_produtos = [];

        let valorTotal = 0;

        for (item of itensPedido) {
            const relacionamento = await knex("pedido_produtos").insert({
                produto_id: item.id,
                pedido_id: novoPedido[0].id,
                quantidade_produto: item.quantidade_pedido,
                valor_produto: item.valor
            }).returning("*");

            valorTotal += item.quantidade_pedido * item.valor;
            novoPedido[0].pedido_produtos.push(relacionamento[0]);

            await knex('produtos')
              .where('id', item.id)
              .update({quantidade_estoque: item.quantidade_estoque - item.quantidade_pedido});
        
        }

        novoPedido[0].valor_total = valorTotal;

        await knex("pedidos").where({id:novoPedido[0].id}).update({
            valor_total: valorTotal
        })

        await enviarEmail(clienteIdExiste.email);

        return res.status(201).json({ "Pedido criado": novoPedido[0] })
    }
    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listarPedidos = async (req, res) => {

  const {cliente_id} = req.query;

    try{

        let query = knex('pedidos').select('*')
            .join('pedido_produtos', 'pedidos.id', '=', 'pedido_produtos.pedido_id');

        if(Array.isArray(cliente_id)){
            query = query.whereIn('pedidos.cliente_id', cliente_id);
        }
        else{

          if (cliente_id) {
            const clienteExiste = await knex("clientes").where({ id: cliente_id }).first();
            
            if (!clienteExiste) {
              return res.status(404).json({ mensagem: "Cliente não está cadastrado" });
            }
          }
          query = query.where(cliente_id ? {'pedidos.cliente_id': cliente_id} :{})
        }

        query.then(rows => {
            const resultado = [];
            const pedidos = {};

            rows.forEach(row => {
                const pedidoId = row.pedido_id;

                if (!pedidos[pedidoId]) {
                    pedidos[pedidoId] = {
                        pedido: {
                        id: row.pedido_id,
                        valor_total: row.valor_total,
                        observacao: row.observacao,
                        cliente_id: row.cliente_id,
                        },
                        pedido_produtos: []
                    }
                }

                pedidos[pedidoId].pedido_produtos.push({
                    id: row.produto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id
                });

            });

            for (const pedidoId in pedidos) {
                resultado.push(pedidos[pedidoId]);
            }

            res.status(200).json(resultado);
        })
    }
    catch(error) {
        res.status(500).json({mensagem: error.message});
    }

}

module.exports = { 
cadastrarPedido,
listarPedidos };