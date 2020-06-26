const express = require('express');
const products = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/productModel');

products.get('/', (req, res, next) => {
    Product.find()
        .select("name price _id")
        .exec()
        .then(resultGET => {
            const response = {
                count: resultGET.length,
                products: resultGET.map(resultGET => {
                    return ({
                        name: resultGET.name,
                        price: resultGET.price,
                        _id: resultGET._id,
                        requestInfo: {
                            type: "GET",
                            url: "http://localhost:3002/products/" + resultGET._id
                        }
                    })
                })
            }
            res.status(200).json(response)
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
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(404).json({
                message: "no such product"
            })

        })
});
products.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.json({
                error: err
            })
        })
});

products.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

});

module.exports = products;

