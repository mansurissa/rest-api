import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Users from '../models/userModel';

const users = express.Router();

users.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    } else {
      const user = new Users({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: ' user created with success'
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error
          });
        });
    }
  });
});

export default users;
