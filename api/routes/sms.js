const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authCheck = require('../auth/auth-check')

const SMSController = require('../controllers/sms')

router.get('/', authCheck, SMSController.get_all_sms)

router.get('/asin/:asin', authCheck, SMSController.get_by_asin)

router.get('/user/:userId', authCheck, SMSController.get_by_user)

router.post('/send', authCheck, SMSController.sendSms, SMSController.logSms)

module.exports = router