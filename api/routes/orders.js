const express = require('express');
//sub package in express to handle routes
const router = express.Router()

const orderController=require('../controllers/order');

router.get('/', orderController.allOrders);

router.post('/', orderController.createOrder);

router.get('/:Pid', orderController.getOrder);

router.delete('/:ID', orderController.deleteOrder);

router.put('/:ID', orderController.updateOrder);

//router with routes is exported
module.exports = router;