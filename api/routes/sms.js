const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authCheck = require('../auth/auth-check')

const SMSController = require('../controllers/sms')

router.post('/send', /*authCheck,*/ SMSController.send )

module.exports = router