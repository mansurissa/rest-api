import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Users from '../models/userModel';

export const userSignup = (req, res) => {
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
};

export const userDelete = (req, res) => {
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
};

export const userLogin = (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user < 1) {
        console.log(user);
        res.status(401).json({
          message: 'auth failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).json({
            message: 'Auth succeded',
            token
          });
        }
        return res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
};
