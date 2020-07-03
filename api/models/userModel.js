const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId(),
    email: { type: String, required: true },
    password: { type: Number, required: true }
})

module.exports = mongoose.model('Users', usersSchema)