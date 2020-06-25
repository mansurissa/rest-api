const express = require('express');
const products = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/productModel');

products.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(resultGET => {
            console.log(resultGET)
            res.status(200).json(resultGET)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "Not Found"
            })
        })

});

products.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            res.status(200).json({
                message: "your product sent sucessful",
                createdProduct: result
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: "failed to post a product"
                    })
                })
        });
});

products.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "no such product"
            })

        })
});
products.patch('/', (req, res, next) => {
    res.status(200).json({
        message: "updated products"
    })
});

products.delete('/', (req, res, next) => {
    Product.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "deleted product"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "failed to delete selected product"
            })
        })

});




module.exports = products;

