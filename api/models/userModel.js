const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', usersSchema)