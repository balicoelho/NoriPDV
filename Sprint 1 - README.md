# NoriPDV
[nutty-twill-toad.cyclic.app](https://nutty-twill-toad.cyclic.app/)

Este projeto baseia-se na criação de uma API RESTful para um PDV (frente de caixa) . Com ela, os usuários podem se cadastrar, fazer login, editar e obter informações sobre seu perfil e listar categorias disponíveis no banco de dados.

<div align='center'>

![image](https://github.com/balicoelho/NoriPDV/assets/120601038/0fa5132c-7cc7-4ead-b54b-8a003562e566)

</div>

## Rotas e funcionalidades da API

- `GET /categoria`: Lista as categorias disponíveis no banco de dados.
- `POST /usuario`: Cadastra novo usuário no sistema, de acordo com os campos: nome, email e senha.
- `POST /login`: Realiza login do usuário cadastrado.
- `GET /usuario`: Permite que o usúario logado visualize seu próprio perfil.
- `PUT /usuario`: Permite que o usúario atualize suas informações de cadastro.

## Para executar:

1. Faça a importação do DumpInsomnia para configurar todos os endpoint.
2. Configure o Bearer Token do Insomnia para inserir o token automaticamente nas rotas em que o mesmo é obrigatório:
<div align='center'>
  
   ![image](https://github.com/balicoelho/api-contas-pessoais/assets/120601038/0d074b28-1d8e-42c2-a50e-e0de75bbd9c1)
 ![image](https://github.com/balicoelho/api-contas-pessoais/assets/120601038/e6112f41-25be-4b43-b3d0-809dcbae9758)
![image](https://github.com/balicoelho/api-contas-pessoais/assets/120601038/8170a8b0-3586-439d-b2aa-7ce0fb28ceb0)

</div>
## Para contribuir com o projeto:

1. Clone este repositório: `git clone git@github.com:balicoelho/NoriPDV`
2. Navegue até o diretório do projeto: `cd NoriPDV`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm run dev`
5. A API estará disponível em: `nutty-twill-toad.cyclic.app`.
