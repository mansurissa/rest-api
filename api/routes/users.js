import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Users from '../models/userModel';

const users = express.Router();

users.post('/signup', (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then((foundUser) => {
      if (foundUser.length >= 1) {
        res.status(409).json({
          message: 'user already exits'
        });
      } else {
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
      }
    });
});

users.delete('/:useId', (req, res) => {
  Users.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'user deleted'
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: ' failed in deleting a user'
      });
    });
});

export default users;
