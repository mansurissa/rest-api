const express = require('express');
const products = express.Router();

products.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handled /product route get"
    })
});

products.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handled /product route post"
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

