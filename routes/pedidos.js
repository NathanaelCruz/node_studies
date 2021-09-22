const express = require('express')
const router = express.Router()

const PedidosController = require('../controllers/pedidosController')

router.get('/', PedidosController.getPedidos)

router.get('/:idpedido', PedidosController.getPedidoDetalhes)

router.post('/', PedidosController.setPedido)

router.patch('/', PedidosController.setAtualizarPedido)

router.delete('/', PedidosController.removePedido)


module.exports = router