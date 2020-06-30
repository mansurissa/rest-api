const express = require('express');
const app = express();

//packages importing
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//importing local stuffs
const productRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

//error handling 

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    console.log("kano gashenzi sha", error)
    res.status(500)
        .json({
            error: {
                message: "naha kari sha"
            }
        });
});

module.exports = app;