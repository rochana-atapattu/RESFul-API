const express = require('express');
//sub package in express to handle routes
const router = express.Router();
const productController = require('../controllers/user');



router.post('/signup',productController.signup );
router.post('/login', productController.login);


//router with routes is exported
module.exports = router;