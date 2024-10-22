import mongoose from 'mongoose';
import Product from '../models/productModel';
import Order from '../models/ordersModel';

export const orderPost = (req, res) => {
  Product.findById(req.body.productId)
    .exec()
    .then((product) => {
      if (!product) {
        res.json({
          message: 'no product found'
        });
      } else {
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        order.save().then((result) => {
          res.json(result);
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

export const orderGet = (req, res) => {
  Order.find()
    .select('product quantity _id')
    .populate('product')
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: `http://localhost:3002/orders/${doc._id}`
            }
          };
        })
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

export const orderGetSingle = (req, res) => {
  Order.findById(req.params.orderId)
    .populate('Product')
    .exec()
    .then((result) => {
      res.status(200).json({
        orderDetails: result,
        request: {
          typpe: 'GET',
          url: `http://localhost/orders/${result._id}`
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: 'no such order found'
      });
    });
};

export const orderDelete = (req, res) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'order cancled',
        result
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};
