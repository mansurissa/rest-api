const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const products = express.Router();
const fileUpload = (req, res, next) => {
  const image = req.files.productImage;
  // console.log(image)
  const imageUrl = path.join(
    __dirname,
    '..',
    '..',
    `/uploads/${new Date().toISOString() + image.name}`
  );
  image.mv(imageUrl, (err) => {
    if (err) {
      console.log(err);
    }
  });
  req.productImage = imageUrl;
  next();
};

products.get('/', (req, res) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then((resultGET) => {
      const response = {
        count: resultGET.length,
        products: resultGET.map((result) => {
          return {
            name: result.name,
            price: result.price,
            productImage: result.productImage,
            _id: result._id,
            requestInfo: {
              type: 'GET',
              url: `http://localhost:3002/products/${result._id}`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);

      res.status(404).json({
        message: 'Not Found'
      });
    });
});

products.post('/', fileUpload, (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.productImage
  });
  product
    .save()
    .then((result) => {
      const posted = {
        name: result.name,
        price: result.price,
        _id: result._id,
        productImage: result.productImage,
        request: {
          type: 'GET',
          url: `http://localhost:3002/products/${result._id}`
        }
      };
      res.status(201).json({
        createdProduct: posted
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'failed to post a product'
      });
    });
});

products.get('/:productId', (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: 'no such product'
      });
    });
});
products.patch('/:productId', (req, res) => {
  const id = req.params.productId;
  const updateOps = {};
  req.body.map((ops) => {
    updateOps[ops.propName] = ops.value;
    return true;
  });

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err
      });
    });
});

products.delete('/:productId', (req, res) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = products;
