const express = require('express');
//sub package in express to handle routes
const router = express.Router()
const Orders = require('../models/order');
const Products = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Orders.find()
        .select('_id productId amount')
        .populate('productId')
        .exec()
        .then(
            doc => {
                const reponse = {
                    count: doc.length,
                    products: doc.map(doc => {
                        return {
                            OrderID: doc._id,
                            product: doc.productId,
                            Quantity: doc.amount,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/orders/' + doc._id
                            }
                        }
                    })

                }
                res.status(200).json(reponse);
            }).catch(err => {
        res.status(500).json({
            message: err
        });
    })

});

router.post('/', (req, res, next) => {
    Products.findById(req.body.productId).then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const newOrder = new Orders({
            _id: new mongoose.Types.ObjectId(),
            productId: req.body.productId,
            amount: req.body.amount

        });

        return newOrder.save()
    }).then(result => {

        res.status(200).json({
            message: "New order placed",
            createOrder: {
                ID: result._id,
                productID: result.productId,
                Amount: result.amount,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            }
        })
    }).catch(err => {
        res.status(500).json({
            message: err
        });
    });
});


router.get('/:Pid', (req, res, next) => {
    const id = req.params.Pid;
    Orders.findById(id)
        .populate('productId')
        .exec()
        .then(
            doc => {
                res.status(200).json(doc);
            }).catch(err => {
        res.status(500).json({
            message: err
        });
    })

});
router.delete('/:ID', (req, res, next) => {
    const id = req.params.ID;
    Orders.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200)
                .json(result);
        }).catch(err => {
        res.status(500)
            .json({
                message: err
            });
    });
})
router.put('/:ID', (req, res, next) => {
    const id = req.params.ID;

    //creating a js object
    const updateOps = {};

    //looping through the req body
    for (const ops of req.body) {

        // add property name in the body and respective value to updateOps
        updateOps[ops.propName] = ops.value;

        //console.log(updateOps );
    }
    //$set is a value in mongoose, then the key:value pairs should be give to tell how to update
    Orders.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200)
                .json({
                    message: "Order Updated",
                    createOrder: {
                        name: result.message,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + id
                        }
                    }
                });
        }).catch(err => {
        res.status(500).json({
            message: err
        });
    })
});
//router with routes is exported
module.exports = router;