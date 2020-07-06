import express from 'express';
import {
  userSignup,
  userDelete,
  userLogin
} from '../controllers/user_controller';

const users = express.Router();

users.post('/signup', userSignup);

users.delete('/:useId', userDelete);

users.post('/login', userLogin);

export default users;
