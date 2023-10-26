const knex = require("../database");
const nodemailer = require('nodemailer');
const config = require('../servicos/nodemailer');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body;

    try {
        const clienteIdExiste = await knex("clientes")
            .where({id: cliente_id})
            .first();

        if (!clienteIdExiste) {
            return res.status(404).json({ mensagem: "Cliente não encontrado" });
        }

        console.log(clienteIdExiste)

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

            await knex('produtos').where('id', itemPedido.produto_id).update({quantidade_estoque: produto.quantidade_estoque - produto.quantidade_pedido})
        
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
        }

        novoPedido[0].valor_total = valorTotal;

        await knex("pedidos").where({id:novoPedido[0].id}).update({
            valor_total: valorTotal
        })

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
            user: config.user,
            pass: config.pass,
            },
        });

        const enviarEmail = async() => {
            const email = await transporter.sendMail({
                from: config.user, 
                to: clienteIdExiste.email, 
                subject: "Seu pedido foi cadastrado com suuuuuucesso!", 
                html: "<b>O tempo de entrega leva de 2 a 3 dias úteis. :D</b>"
            });
        };

        enviarEmail();

        return res.status(201).json({ "Pedido criado": novoPedido[0] })
    }
    catch (error) {
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