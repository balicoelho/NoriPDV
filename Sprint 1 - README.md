# NoriPDV

Este projeto baseia-se na criação de uma API RESTful para um PDV (frente de caixa) . Com ela, os usuários podem se cadastrar, fazer login, editar e obter informações sobre seu perfil e listar categorias disponíveis no banco de dados.

<div align='center'>
<br>
(Colar print)
<br>

</div>

## Rotas e funcionalidades da API

- `GET /categoria`: Lista as categorias disponíveis no banco de dados.
- `POST /usuario`: Cadastra novo usuário no sistema, de acordo com os campos: nome, email e senha.
- `POST /login`: Realiza login do usuário cadastrado.
- `GET /usuario`: Permite que o usúario logado visualize seu próprio perfil.
- `PUT /usuario`: Permite que o usúario atualize suas informações de cadastro.

## Para executar:

1. Clone este repositório: `git clone git@github.com:balicoelho/NoriPDV`
2. Navegue até o diretório do projeto: `cd NoriPDV`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm run dev`
5. A API estará disponível em: `nutty-twill-toad.cyclic.app`.
