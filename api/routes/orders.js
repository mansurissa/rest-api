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
            res.status(200).json({
                count: docs.length,
                orders: docs.map(docs => {
                    return ({
                        _id: docs._id,
                        product: docs.product,
                        quantity: docs.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3002/orders/" + docs._id
                        }
                    })
                })

            })
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
