const mongoose = require('mongoose')
const SMS = require('../models/sms')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authToken = process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.TWILIO_ACCOUNT_SID

console.log( authToken + "  " + accountSid )
const client = require('twilio')(accountSid, authToken)

exports.send = (req, res, next) => {

    client.messages.create({
        to: process.env.MY_PHONE_NUMBER,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: 'Hello Bucky! This is your sms-rest-api.  Nice to meet you!'
    })
    .then( (message) => {
        res.status(200).json({
            greeting: "Returning this message from the SMS controller.",
            result: message.sid
        })
    })
    .done()    
}