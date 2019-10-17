var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'api-core-sms' })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
    body: req.body
    })
})

module.exports = router
