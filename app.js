const express = require('express');
const app = express();

const morgan = require('morgan');

const productRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');

app.use(morgan())

app.use('/products', productRouter);
app.use('/orders', ordersRouter)

module.exports = app;