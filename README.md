# NoriPDV
Link do deploy: [nutty-twill-toad.cyclic.app](https://nutty-twill-toad.cyclic.app/)

Este projeto baseia-se na criação de uma API RESTful para um PDV (frente de caixa) . Com ela, os usuários podem se cadastrar, fazer login, editar e obter informações sobre seu perfil e listar categorias disponíveis no banco de dados.
<div align='center'>

![imagem1 (1)](https://github.com/balicoelho/NoriPDV/assets/138259133/5d47a464-7236-4eae-b051-737a85119838)


</div>

## Rotas e funcionalidades da API

- `GET /categoria`: Lista as categorias disponíveis no banco de dados.
- `POST /usuario`: Cadastra novo usuário no sistema, de acordo com os campos: nome, email e senha.
- `POST /login`: Realiza login do usuário cadastrado.
- `GET /usuario`: Permite que o usúario logado visualize seu próprio perfil.
- `PUT /usuario`: Permite que o usúario atualize suas informações de cadastro.
- `POST /produto`: Permite que o usúario cadastre um produto.
- `PUT /produto/:id`: Permite que o usúario atualize as informações de um produto.
- `GET /produto`: Permite que o usúario liste todos os produtos cadastrados.
- `GET /produto/:id`: Permite que o usúario detalhe informações de um produto.
- `DELETE /produto/:id`: Permite que o usúario exclua um produto.
- `POST /cliente`: Permite que o usúario cadastre um cliente.
- `PUT /cliente/:id`: Permite que o usúario atualize as informações de um cliente cadastrado.
- `GET /cliente`: Permite que o usúario liste todos os clientes cadastrados.
- `GET /cliente/:id`: Permite que o usúario detalhe informações de um cliente.

## Para executar:

1. Faça a importação do DumpInsomnia para configurar todos os endpoint.
2. No canto superior direito do Insomnia, clique na configuração de "Base Environment", adicione {"local": "https://nutty-twill-toad.cyclic.app"}
3. Configure o Bearer Token do Insomnia para inserir o token automaticamente nas rotas em que o mesmo é obrigatório:
<div align='center'>
  
![1 (1)](https://github.com/balicoelho/NoriPDV/assets/138259133/6cc7f8b0-e9c1-4dcf-803c-9cbfa46f5b3c)

</div>
## Para contribuir com o projeto:

1. Clone este repositório: `git clone git@github.com:balicoelho/NoriPDV`
2. Navegue até o diretório do projeto: `cd NoriPDV`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm run dev`
5. A API estará disponível em: `nutty-twill-toad.cyclic.app`.
