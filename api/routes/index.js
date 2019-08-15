var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'sms-rest-api' })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
      body: req.body
    })
})

module.exports = router
