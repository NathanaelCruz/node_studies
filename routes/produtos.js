const express = require('express')
const router = express.Router()
const ProdutosController = require('../controllers/produtosController')
// para tratar com as imagens
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
    }

}
const login = require('../middleware/login')

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    //Filtra o arquivo
    fileFilter: fileFilter
})

router.get('/', ProdutosController.getProdutos)
router.post('/',
             login.obrigatorio,
             upload.single('produto_imagem'),
             ProdutosController.setProduto
)
router.get('/:id_produto', ProdutosController.getProdutoDetalhe)
router.patch('/', login.obrigatorio, ProdutosController.atualizarProduto)
router.delete('/', login.obrigatorio, ProdutosController.removeProduto)


module.exports = router