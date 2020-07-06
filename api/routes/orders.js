import express from 'express';
import checkAuth from '../middleware/check-auth';
import {
  orderPost,
  orderGet,
  orderGetSingle,
  orderDelete
} from '../controllers/order_controller';

const orders = express.Router();

orders.route('/').post(checkAuth, orderPost).get(checkAuth, orderGet);
orders
  .route('/:orderId')
  .post(checkAuth, orderGetSingle)
  .delete(checkAuth, orderDelete);

export default orders;
