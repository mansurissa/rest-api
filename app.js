const express = require('express');
const app = express();

const morgan = require('morgan');

const productRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
app.use(morgan('dev'))

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

//error handling 

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;