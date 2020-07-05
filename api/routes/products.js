import express from 'express';
import fileUpload from '../middleware/fileUpload';
import checkAuth from '../middleware/check-auth';
import {
  productDelete,
  productGet,
  productPost,
  productGetSingle,
  productPatch
} from '../controllers/product_controller';

const products = express.Router();

products.route('/').get(productGet).post(checkAuth, fileUpload, productPost);
products
  .route('/:productId')
  .get(productGetSingle)
  .patch(checkAuth, productPatch)
  .delete(checkAuth, productDelete);

export default products;
