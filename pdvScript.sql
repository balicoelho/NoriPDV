DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE categorias(
    id SERIAL PRIMARY KEY,
  	descricao VARCHAR(255) NOT NULL,
);

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  	nome VARCHAR(255) NOT NULL,
  	email VARCHAR(255) NOT NULL UNIQUE,
  	senha VARCHAR(255) NOT NULL
);

INSERT INTO categorias
    (descricao) VALUES
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');