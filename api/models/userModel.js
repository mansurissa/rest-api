import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', usersSchema);
