const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const indexRouter = require('./api/routes/index')
const usersRouter = require('./api/routes/users')
const smsRouter = require('./api/routes/sms')

mongoose.connect(
    'mongodb://admin:' +
    process.env.MONGO_ATLAS_PW +
    '@ch-twilio-amzn-scrape-shard-00-00-hegqy.mongodb.net:27017,ch-twilio-amzn-scrape-shard-00-01-hegqy.mongodb.net:27017,ch-twilio-amzn-scrape-shard-00-02-hegqy.mongodb.net:27017/test?ssl=true&replicaSet=ch-twilio-amzn-scrape-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true,
    })
mongoose.Promise = global.Promise

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'api', 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/sms', smsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
