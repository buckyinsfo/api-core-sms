var express = require('express')
var router = express.Router()

/* GET user page. */
router.get('/user', (req, res, next) => {
    res.render('user', { appName: 'api-core-sms' })
})

module.exports = router