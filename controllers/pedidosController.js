const mysql = require('../mysql').pool

exports.getPedidos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        
        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            `SELECT pedidos.idpedido,
                    pedidos.quantidade,
                    produtos.idproduto,
                    produtos.nome,
                    produtos.preco
                    FROM pedidos
            INNER JOIN produtos
                    ON produtos.idproduto = pedidos.idproduto_fk`,
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                if(error) { return res.status(500).send({ error: error})}

                //Otima pratica para API publica
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return {
                            idpedido: pedido.idpedido,
                            quantidade: pedido.quantidade,
                            produto: {
                                idproduto: pedido.idproduto,
                                nome: pedido.nome,
                                preco: pedido.preco
                            },
                            request: {
                                tipo: 'GET',
                                description: 'Retorna os detalhes de um pedido especifico',
                                url: `${process.env.SERVER}pedidos/${pedido.idpedido}`
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

exports.setPedido = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos WHERE idproduto = ?',
            [req.body.idproduto],
            (error, result, field) => {
                if(result.length === 0) return res.status(404).send({ mensagem: `Não foi encontrado o produto com o ID${req.body.idproduto}`})
                conn.query(
                    'INSERT INTO pedidos (idproduto_fk, quantidade) values (?,?)',
                    [req.body.idproduto, req.body.quantidade],
                    (error, result, field) => {
                        //Libera a conexão, deve ter sempre sempreeee
                        conn.release()
                        
                        if(error) { return res.status(500).send({ error: error})}
        
                        const response = {
                            mensagem: 'Pedido criado com sucesso',
                            produtoCriado: {
                                idpedido: result.idproduto,
                                idproduto: req.body.idproduto,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    description: 'Retorna todos os pedidos',
                                    url: `${process.env.SERVER}pedidos`
                                }
                            }
                        }
                        
                        return res.status(201).send(response)
                    }
                )
            }
        )
    })

}

exports.getPedidoDetalhes = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        
        if(error) { return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM pedidos WHERE idpedido = ?',
            [req.params.idpedido],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                if(error) { return res.status(500).send({ error: error})}

                if(result.length === 0) return res.status(404).send({ mensagem: `Não foi encontrado o pedido com o ID${req.params.idpedido}`})

                const response = {
                    pedido: {
                        idpedido: result[0].idpedido,
                        idproduto: result[0].idproduto_fk,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            description: 'Retorna todos os pedidos',
                            url: `${process.env.SERVER}pedidos`
                        }
                    }
                }

                return res.status(200).send(response)
            }

        )
    })
}

exports.setAtualizarPedido = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE pedidos
                SET quantidade = ?
                WHERE idpedido = ?
            `,
            [req.body.quantidade, req.body.idpedido],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                
                if(error) { return res.status(500).send({ error: error})}

                const response = {
                    mensagem: 'Pedido atualizado com sucesso',
                    produtoAtualizado: {
                        idpedido: req.body.idpedido,
                        idproduto: result.idproduto_fk,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: 'GET',
                            description: 'Retorna os detalhes do pedido',
                            url: `${process.env.SERVER}produtos/${req.body.idpedido}`
                        }
                    }
                }
                
                return res.status(202).send(response)
            }
        )
    })
    
}

exports.removePedido = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `DELETE FROM pedidos WHERE idpedido = ?`,
            [req.body.idproduto],
            (error, result, field) => {
                //Libera a conexão, deve ter sempre sempreeee
                conn.release()
                if(error) { return res.status(500).send({ error: error})}

                const response = {
                    mensagem: 'Pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        description: 'Insere Um pedido',
                        url: `${process.env.SERVER}pedidos/`,
                        body: {
                            idproduto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                
                return res.status(202).send(response)
            }
        )
    })
}