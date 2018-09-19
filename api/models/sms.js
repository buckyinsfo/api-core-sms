const mongoose = require('mongoose')

const smsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: Number, required: true },
})

module.exports = mongoose.model('SMS', smsSchema)