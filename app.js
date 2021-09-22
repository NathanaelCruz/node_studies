const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
const rotaUsuarios = require('./routes/usuarios')

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    )

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, DELETE, POST')
        return res.status(200).send({})
    }

    next()
})

app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)
app.use('/usuarios', rotaUsuarios)

//Quando der error
app.use((req, res, next) => {
    const erro = new Error('Não encontrado')

    erro.status = 404

    next(erro)
})
//Tratamento de Erro
app.use((error, req, res, next) => {
    res.status(error.status || 500)

    return res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app