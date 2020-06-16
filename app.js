const express = require('express');
const app = express();
const productRouter = require('./api/routes/products')

app.use('/products', productRouter);

module.exports = app;