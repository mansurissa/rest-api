const express = require('express')
const mongoose = require('mongoose')
const users = express.Router()
const bcrypt = require('bcrypt')

const Users = require('../models/userModel')

users.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            const users = new Users({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            })
            users.save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: " user created with success"
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

module.exports = users