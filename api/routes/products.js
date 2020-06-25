const express = require('express');
const products = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/productModel');

products.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handled /product route get"
    })
});

products.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    res.status(200).json({
        message: "handled /product route post",
        createdProduct: product
    })
});

products.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === "123") {
        res.status(200).json({
            message: "handled /productId route with success"
        })
    }
    else {
        res.status(400).json({
            message: "you did it wrong",
            id: id
        })
    }

});
products.patch('/', (req, res, next) => {
    res.status(200).json({
        message: "updated products"
    })
});

products.delete('/', (req, res, next) => {
    res.status(200).json({
        message: "deleted products"
    })
});




module.exports = products;

