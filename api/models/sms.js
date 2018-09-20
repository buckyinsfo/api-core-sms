const mongoose = require('mongoose')

const smsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time : { type : Date, default: Date.now },
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: Number, required: true },
    asin: { type: String, required: true },
    oldPrice: { type: Number, required: true },
	oldSeller: { type: String, required: true },
	newPrice: { type: Number, required: true },
    newSeller: { type: String, required: true },
    msgSid: { type: String, required: true },
})

module.exports = mongoose.model('SMS', smsSchema)