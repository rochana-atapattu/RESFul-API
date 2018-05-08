const express = require('express');
//sub package in express to handle routes
const router = express.Router()

const auth = require('../Authentication/auth');

const productController = require('../controllers/products');


router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

router.get('/:Pid', productController.getProduct);

router.delete('/:ID', productController.deleteProduct)

router.put('/:ID', productController.updateProduct);
//router with routes is exported
module.exports = router;