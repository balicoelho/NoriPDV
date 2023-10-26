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

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const clienteExiste = await knex("clientes").where({ id: cliente_id }).first();
     
      if (!clienteExiste) {
        return res.status(404).json({ mensagem: "Cliente não está cadastrado" });
      }
    }

    let query = knex("pedidos");
    
      if (cliente_id) {
      query
        .join("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
        .where((query) => {
          if (Array.isArray(cliente_id)) {
            query.whereIn("pedidos.cliente_id", cliente_id);
          } else {
            query.where("pedidos.cliente_id", cliente_id);
          }
        }).select("pedidos.*", "pedido_produtos.*")        
    }         
const pedidos = await query;

if (pedidos.length === 0) {
  return res.status(404).json({ mensagem: "Nenhum pedido encontrado" });
} 

if (cliente_id) {
  const respostaFormatada = {        
    pedidos: pedidos.map((pedido) => ({
      pedido: {
        id: pedido.pedido_id,
        valor_total: pedido.valor_total,
        observacao: pedido.observacao,
        cliente_id: pedido.cliente_id
      },
      pedido_produtos: [
        {
          id: pedido.id,
          quantidade_produto: pedido.quantidade_produto,
          valor_produto: pedido.valor_produto,
          pedido_id: pedido.pedido_id,
          produto_id: pedido.produto_id
        }
       ]
    }))
  };

  return res.status(200).json(respostaFormatada);
} 

return res.status(200).json(pedidos);
   } 
  catch (error) {    
    return res.status(500).json({ mensagem: error.message });
  }
};
module.exports = { 
cadastrarPedido,
listarPedidos };