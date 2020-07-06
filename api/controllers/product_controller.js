import mongoose from 'mongoose';
import Product from '../models/productModel';

export const productPost = (req, res) => {
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
};

export const productGetSingle = (req, res) => {
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
};

export const productGet = (req, res) => {
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
};

export const productPatch = (req, res) => {
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
};

export const productDelete = (req, res) => {
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
};
