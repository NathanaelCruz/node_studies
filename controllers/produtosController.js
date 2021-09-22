
const mysql = require('../mysql').pool

exports.getProdutos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        
        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos',
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                if(error) { return res.status(500).send({ error: error})}

                //Otima pratica para API publica
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produto: prod.idproduto,
                            name: prod.nome,
                            preco: prod.preco,
                            imagem_produto: prod.imagem_produto,
                            request: {
                                tipo: 'GET',
                                description: 'Retorna os detalhes de um produto especifico',
                                url: `${process.env.SERVER}produtos/${prod.idproduto}`
                            }
                        }
                    })
                }

                return res.status(200).send({
                    response: response
                })
            }

        )
    })
}

exports.setProduto = (req, res, next) => {
    console.log(req.file)
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco, imagem_produto) values (?, ?, ?)',
            [
                req.body.name,
                req.body.price,
                req.file.path
            ],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                
                if(error) { return res.status(500).send({ error: error})}

                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        idproduto: result.idproduto,
                        nome: req.body.name,
                        preco: req.body.price,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'GET',
                            description: 'Retorna todos os produtos',
                            url: `${process.env.SERVER}produtos`
                        }
                    }
                }
                
                return res.status(201).send(response)
            }
        )
    })
}

exports.getProdutoDetalhe = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        
        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos WHERE idproduto = ?',
            [req.params.id_produto],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                if(error) { return res.status(500).send({ error: error})}

                if(result.length === 0) return res.status(404).send({ mensagem: `Não foi encontrado o produto com o ID${req.params.id_produto}`})

                const response = {
                    produto: {
                        idproduto: result[0].idproduto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_produto: result[0].imagem_produto,
                        request: {
                            tipo: 'GET',
                            description: 'Retorna todos os produtos',
                            url: `${process.env.SERVER}produtos`
                        }
                    }
                }

                return res.status(200).send(response)
            }

        )
    })
}

exports.atualizarProduto = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE produtos
                SET nome = ?,
                    preco = ?
                WHERE idproduto = ?
            `,
            [req.body.name, req.body.price, req.body.idproduto],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                
                if(error) { return res.status(500).send({ error: error})}

                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: {
                        idproduto: req.body.idproduto,
                        nome: req.body.name,
                        preco: req.body.price,
                        imagem_produto: req.body.imagem_produto,
                        request: {
                            tipo: 'GET',
                            description: 'Retorna os detalhes do produto',
                            url: `${process.env.SERVER}produtos/${req.body.idproduto}`
                        }
                    }
                }
                
                return res.status(202).send(response)
            }
        )
    })
}

exports.removeProduto = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `DELETE FROM produtos WHERE idproduto = ?`,
            [req.body.idproduto],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                if(error) { return res.status(500).send({ error: error})}

                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        description: 'Insere Um produto',
                        url: `${process.env.SERVER}produtos/`,
                        body: {
                            name: 'String',
                            price: 'Number'
                        }
                    }
                }
                
                return res.status(202).send(response)
            }
        )
    })
}