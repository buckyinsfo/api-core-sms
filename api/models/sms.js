const mongoose = require('mongoose')

const smsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time : { type : Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: Number, required: true },
    msg: { type: String, required: true }
})

module.exports = mongoose.model('SMS', smsSchema)