const express = require('express')
const mongoose = require('mongoose')
const users = express.Router()

const User = require('../models/userModel')

users.post('/signup', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.objextId(),
        email: req.body.email,
        password: req.body.password
    })
})

module.exports = users