# NORI PDV

<img align="center" height="250" width="250" alt="NoriPdv" src="./assets/NoriPDV-Logo.png" />

<br>
Este projeto baseia-se na criação de uma API RESTful para um PDV (frente de caixa) . Com ela, os usuários podem se cadastrar, cadastrar clientes e produtos e criar pedidos.
<br><br>

Link do deploy: [nutty-twill-toad.cyclic.app](https://nutty-twill-toad.cyclic.app/)
<br><br>

## 🛠️ Construído com

<br>
Neste projeto foram utilizadas as seguintes ferramentas:
<br><br>

|                                                        Javascript                                                         |                                                      Node.js                                                      |                                                       Express                                                       |                                                     Git                                                     |                                                      GitHub                                                       |                                                        PostgreSQL                                                         |                                                          NPM                                                          |
| :-----------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" /> |

<br>

### 🔧 Autenticação

Esta API utiliza sistema `Bearer Token` de autenticação.

O token é obtido através do EndPoint `POST /login`.

Se o usuário e suas credenciais forem válidos, esta rota retorna um objeto contendo o token de validação que será exigido em todas as rotas desta API, exceto no cadastro e login de usuário, e listagem de categorias.

## 🚀 Começando

<br>
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento, testes e contribuição.

Consulte **[Implantação](#📦-implantação)** para saber como utilizar a API em seu projeto.

<br>

### 📋 Pré-requisitos

<br>
Para a execução deste projeto você precisa ter instalado em sua máquina:

```
- Node.js
- Terminal de sua preferência
- Insomnia
```

<br>

### 🔧 Instalação

#### Rodando localmente

1 - Abra o terminal na pasta em que deseja salvar o projeto.

2 - Clone este repositório

```
git clone git@github.com:balicoelho/NoriPDV
```

3 - Navegue até o diretório do projeto

```
cd NoriPDV
```

4 - Crie seu arquivo de váriáveis de ambiente (.env) a partir do arquivo de exemplo ".env.example"

```
PORT=
SENHA_TOKEN=

DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=

BUCKET_KEY_ID=
BUCKET_KEY_NAME=
BUCKET_APP_KEY=
BUCKET_ENDPOINT=
BUCKET_NAME=
```

5 - Inicie o servidor do aplicativo utilizando o comando:

```
npm run dev
```

6 - Recomendamos a utilização do aplicativo Insomnia para testar as rotas. Consulte **[Executando os Testes](#⚙️-executando-os-testes)** para saber como realizar os testes.

## 📦 Implantação

Para utilizar essa API em seu projeto recomendamos utilização da ferramenta axios.

Consulte [Axios](https://axios-http.com/ptbr/docs/intro) para maiores informações.

```
baseURL: 'http://nutty-twill-toad.cyclic.app/'
```

<br><br>

## 🔧 Funcionalidades

### Usuário:

- [x] [Cadastrar Usuário](#post-usuario)
- [x] [Login Usuário](#post-login)
- [x] [Obter Perfil Usuário](#get-usuario)
- [x] [Editar Perfil Usuário](#put-usuario)

### Categorias:

- [x] [Listar Categorias](#get-categoria)

### Produtos:

- [x] [Cadastrar Produtos](#post-produto)
- [x] [Obter Produto](#get-produtoid)
- [x] [Listar Produto](#get-produto)
- [x] [Editar Produto](#put-produtoid)

### Clientes:

- [x] [Cadastrar Clientes](#post-cliente)
- [x] [Obter Cliente](#get-clienteid)
- [x] [Listar Clientes](#get-cliente)
- [x] [Editar Cliente](#put-clienteid)

### Pedidos:

- [x] [Criar Pedido](#post-pedido)
- [x] [Listar Pedidos]()
- [x] [Obter Pedido]()

## 🔧 Endpoints

#### `GET /categoria`:

Lista as categorias disponíveis no banco de dados.

Não é necessário fornecer nenhuma informação adicional na requisição.

Será retornado um objeto contendo a lista de todas as categorias cadastradas no Banco de Dados.
<br><br>

#### `POST /usuario`:

Cadastra novo usuário no sistema, de acordo com os campos: nome, email e senha.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "nome":,
    "email":,
    "senha":
}
```

Todos os campos são obrigatórios.

Se o cadastro do usuário for realizado com sucesso, será retornado um objeto contendo os dados do usuário cadastrado.
<br><br>

#### `POST /login`:

Realiza login do usuário cadastrado.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "email":,
    "senha":
}
```

Todos os campos são obrigatórios.

Se o login for realizado com sucesso, será retornado um objeto contendo os dados do usuário cadastrado e o Bearer Token de validação que será obrigatório em todas as rotas seguintes dessa API.
<br><br>

#### `GET /usuario`:

Permite que o usúario logado visualize seu próprio perfil.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do usuário logado.
<br><br>

#### `PUT /usuario`:

Permite que o usúario atualize suas informações de cadastro.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "nome":,
    "email":,
    "senha":
}
```

Todos os campos são obrigatórios.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do usuário atualizado.
<br><br>

#### `POST /produto`:

Permite que o usúario cadastre um produto.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "descricao":
    "quantidade_estoque":
    "valor":
    "categoria_id":
}
```

Todos os campos são obrigatórios.

O id da categoria deve ser um id válido de uma categoria cadastrada no banco de dados. Para obter informações sobre as categorias cadastradas, usar rota [`GET /categoria`](#get-categoria) .

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do produto cadastrado.

<br><br>

#### `PUT /produto/:id`:

Permite que o usúario atualize as informações de um produto.

É necessário fornecer como parametro da rota (req.params) o id do produto que deseja atualizar.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "descricao":
    "quantidade_estoque":
    "valor":
    "categoria_id":
}
```

Todos os campos são obrigatórios.

O id da categoria deve ser um id válido de uma categoria cadastrada no banco de dados. Para obter informações sobre as categorias cadastradas, usar rota [`GET /categoria`](#get-categoria) .

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do produto atualizado.
<br><br>

#### `GET /produto`:

Permite que o usúario liste todos os produtos cadastrados.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados de todos os produtos cadastrados no banco de dados.

<br><br>

#### `GET /produto/:id`:

Permite que o usúario detalhe informações de um produto.

É necessário fornecer como parametro da rota (req.params) o id do produto que deseja obter.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do produto solicitado.
<br><br>

#### `DELETE /produto/:id`:

Permite que o usúario exclua um produto.

É necessário fornecer como parametro da rota (req.params) o id do produto que deseja excluir.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do produto excluído.
<br><br>

#### `POST /cliente`:

Permite que o usúario cadastre um cliente.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "nome":
    "email":
    "cpf":
    "cep":
    "rua":
    "numero":
    "bairro":
    "cidade":
    "estado":
}
```

Os campos nome, email e cpf são obrigatórios. Os demais campos são opcionais. Os campos email e cpf não podem ser repetidos em mais de um cadastro.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do cliente cadastrado.
<br><br>

#### `PUT /cliente/:id`:

Permite que o usúario atualize as informações de um cliente cadastrado.

É necessário fornecer como parametro da rota (req.params) o id do cliente que deseja atualizar.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    "nome":
    "email":
    "cpf":
    "cep":
    "rua":
    "numero":
    "bairro":
    "cidade":
    "estado":
}
```

Os campos nome, email e cpf são obrigatórios. Os demais campos são opcionais. Os campos email e cpf não podem ser repetidos em mais de um cadastro.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do cliente atualizado.
<br><br>

#### `GET /cliente`:

Permite que o usúario liste todos os clientes cadastrados.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados de todos os clientes cadastrados no banco de dados.
<br><br>

#### `GET /cliente/:id`:

Permite que o usúario detalhe informações de um cliente.

É necessário fornecer como parametro da rota (req.params) o id do cliente que deseja obter.

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados de todos os clientes cadastrados no banco de dados.
<br><br>

#### `POST /pedido`:

Permite que o usúario cadastre um novo pedido.

É necessário fornecer no body da requisição, um arquivo json contendo os seguintes campos devidamente preenchidos:

```
{
    {
    "cliente_id":
    "observacao":
    "pedido_produtos": [
        {
            "produto_id":
            "quantidade_produto":
        },
        {
            "produto_id":
            "quantidade_produto":
        }
        {
            "produto_id":
            "quantidade_produto":
        }
    ]
}
}
```

O campo cliente_id é obrigatório. Sendo pedido_produtos um array com todos os produtos e suas respectivas quantidades contidos no pedido, é exigido que pelo menos um produto exista no array pedido_produto.

O cliente_id deve ser um id válido de um cliente devidamente cadastrado no banco de dados. Para obter informações sobre os clientes cadastrados, usar rota [`GET /cliente`](#get-cliente).

O produto_id deve ser um id válido de um produto devidamente cadastrado no banco de dados. Para obter informações sobre os produtos cadastrados, usar rota [`GET /produto`](#get-produto).

É necessário informar na requisição o Bearer Token retornado na rota de login.

Se todas as condições forem atendidas e o Bearer Token for devidamente autenticado, será retornado um objeto contendo os dados do pedido criado.

<br><br>

## ⚙️ Executando os testes

No aplicativo Insomnia:

1 - Faça a importação do DumpInsomnia para configurar todos os endpoint.

2 - No canto superior direito do Insomnia, clique na configuração de "Base Environment", adicione {"local": "https://nutty-twill-toad.cyclic.app"}

3 - Configure o Bearer Token do Insomnia para inserir o token automaticamente nas rotas em que o mesmo é obrigatório:

<div align='center'>

![1 (1)](https://github.com/balicoelho/NoriPDV/assets/138259133/6cc7f8b0-e9c1-4dcf-803c-9cbfa46f5b3c)

<br><br>

## 👩🏻‍💻 AUTOR

### Grupo A Sociedade do Código

#### Colaboradoras:

• Bárbara Coelho - [[@balicoelho](https://github.com/balicoelho)]

• Dani Nere - [[@DaniNere](https://github.com/DaniNere)]

• Fernanda Pestana - [[@pestanafj](https://github.com/pestanafj)]

• Lizandra Gomes - [[@Lizaliz0](https://github.com/Lizaliz0)]

• Vitória Cecília - [[@Vitcecilia](https://github.com/Vitcecilia)]

<br>
Projeto criado durante Desafio Final do Curso Desenvolvimento de Software BackEnd da Cubos Academy.
<br><br>
Outubro 2023.
