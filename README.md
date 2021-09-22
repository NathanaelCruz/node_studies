# API NODE JS

Esse repositório serve para armazenar a criação de rotas com NODEJS, que esta sendo estudo por mim, no intuito de entender melhor esse ambiente em backend.

## TECNOLOGIAS UTILIZADAS

1. Node JS
1. Nodemon
1. Morgan
1. Multer
1. Bcrypt
1. Json Web Token
1. Mysql

## UTILIZAÇÃO

1. Primeiro realize o `git clone` deste repositório
1. Após isso utilize o `npm i` para instalar as dependências
1. O BD utilizado foi o MySQL, mais informações da estrutura do banco de dados abaixo.
1. Toda a api tem sua documentação, logo facilita a identificação de métodos

## MODELO DO BD::MySQL

1. Banco de dados: `ecommerce;`
1. Tabela `usuarios`

| Campos    | Catacteristicas                             |
| --------- | ------------------------------------------- |
| idusuario | int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT |
| email     | varchar(120) NOT NULL                       |
| senha     | varchar(120) NOT NULL                       |

3. Tabela `produtos`

| Campos         | Catacteristicas                             |
| -------------- | ------------------------------------------- |
| idproduto      | int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT |
| nome           | varchar(240) NOT NULL                       |
| preco          | float NOT NULL                              |
| imagem_produto | varchar(255) NULL                           |

4. Tabela `pedidos`

| Campos       | Catacteristicas                             |
| ------------ | ------------------------------------------- |
| idpedido     | int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT |
| idproduto_fk | int(11) NOT NULL MUL                        |
| quantidade   | smallint(6) NOT NULL                        |

5. Criando essas tabelas, é possível utilizar a API.

### Desenvolvido por Nathanael Cruz Alves
