const express = require('express')
const router = express.Router()

const UsuariosController = require('../controllers/usuariosController')

router.post('/cadastro', UsuariosController.cadastrarUsuario)

router.post('/login', UsuariosController.loginUsuario)


module.exports = router