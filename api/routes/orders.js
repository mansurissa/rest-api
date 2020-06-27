const express = require('express');
const orders = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/ordersModel');

orders.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.ObjectId
    });
    order
        .save()
        .then(result => {
            res.json(result)
        }
        )
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});

orders.get('/', (req, res, next) => {
    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

orders.get('/:orderId', (req, res, next) => {
    res.json({
        message: 'order details'
    })
})

orders.delete('/', (req, res, next) => {
    res.json({
        message: 'order deleted'
    })
})

module.exports = orders;
