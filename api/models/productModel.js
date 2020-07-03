import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, require: true }
});
export default mongoose.model('Product', productSchema);
