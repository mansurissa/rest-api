const express = require('express');
const app = express();
const productRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders')

app.use('/products', productRouter);
app.use('/orders', ordersRouter)

module.exports = app;