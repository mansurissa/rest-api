const express = require('express');
const products = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '.uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + req.file.originalname)
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/pdf') {
        cb('null', true)
    } else {
        cb('null', false)
    }
}

const upload = multer({
    storage: storage,
    limits: {

    }
});

const Product = require('../models/productModel');

products.get('/', (req, res, next) => {
    Product.find()
        .select("name price _id productImage")
        .exec()
        .then(resultGET => {
            const response = {
                count: resultGET.length,
                products: resultGET.map(resultGET => {
                    return ({
                        name: resultGET.name,
                        price: resultGET.price,
                        productImage: resultGET.productImage,
                        _id: resultGET._id,
                        requestInfo: {
                            type: "GET",
                            url: "http://localhost:3002/products/" + resultGET._id
                        }
                    })
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "Not Found"
            })
        })

});

products.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            const posted = {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3002/products/" + result._id
                }
            }
            res.status(200).json({
                createdProduct: posted
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: "failed to post a product"
                    })
                })
        });
});

products.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(404).json({
                message: "no such product"
            })

        })
});
products.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.json({
                error: err
            })
        })
});

products.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

});

module.exports = products;

