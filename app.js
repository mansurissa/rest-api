import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import productRouter from './api/routes/products';
import ordersRouter from './api/routes/orders';
import usersRouter from './api/routes/users';

const app = express();

// packages importing
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);

// importing local stuffs
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use('/products', productRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

// error handling

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  console.log('kano gashenzi sha', error);
  res.status(500).json({
    error: {
      message: 'naha kari sha hacker arakanyeretse'
    }
  });
});

export default app;
