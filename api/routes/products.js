const express = require('express');
//sub package in express to handle routes
const router = express.Router()
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find().select('name product _id')
        .exec()
        .then(
            doc => {
                const reponse = {
                    count: doc.length,
                    products: doc.map(doc => {
                        return {
                            name: doc.name,
                            product: doc.product,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })

                }
                res.status(200)
                    .json(reponse);
            }).catch(err => {
        res.status(500).json({
            message: err
        });
    })

});

router.post('/', (req, res, next) => {

    const product1 = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        product: req.body.product

    });
    product1.save()
        .then(result => {
            res.status(200)
                .json({
                    message: "New Product created",
                    createProduct: {
                        name: result.name,
                        product: result.product,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + result._id
                        }
                    }
                })
        }).catch(err => {
        res.status(500)
            .json({
                message: err
            });
    });

});

router.get('/:Pid', (req, res, next) => {
    const id = req.params.Pid;
    Product.findById(id)
        .exec()
        .then(
            doc => {
                res.status(200)
                    .json(doc);
            }).catch(err => {
        res.status(500).json({
            message: err
        });
    })

});
router.delete('/:ID', (req, res, next) => {
    const id = req.params.ID;
    Product.remove({_id: id})
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
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200)
                .json({
                    message: "Product Updated",
                    createProduct: {
                        name: result.message,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + id
                        }
                    }
                });
        }).catch(err => {
        res.status(500)
            .json({
                message: err
            });
    })
});
//router with routes is exported
module.exports = router;