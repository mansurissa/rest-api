const express = require('express');
const orders = express.Router();

orders.post('/', (req, res, next) => {
    const order = {
        item: req.body.itemId,
        quantity: req.body.quantity
    }
    res.json({
        message: 'order sent',
        placedOrder: order
    })
});

orders.get('/', (req, res, next) => {
    res.json({
        message: 'order got'
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
