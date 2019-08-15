var express = require('express')
var router = express.Router()

/* GET user page. */
router.get('/user', (req, res, next) => {
    res.render('user', { appName: 'sms-rest-api' })
})

module.exports = router