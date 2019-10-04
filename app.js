const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./api/routes/index')
const formsRouter = require('./api/routes/forms')
const usersRouter = require('./api/routes/users')
const smsRouter = require('./api/routes/sms')

const app = express() 

const cors = require('cors')
const mongoose = require('./mongoose-connect')

// view engine setup
app.set('views', path.join(__dirname, 'api', 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

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
app.use('/forms', formsRouter)
app.use('/sms', smsRouter)
app.use('/users', usersRouter)
  
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
    res.json({
        // error: {
<<<<<<< HEAD
        message: error.message
        // msg: "not good to be here"
=======
        //     header: "royal fail",
        message: error.message

        //    msg: "not good to be here"
>>>>>>> 6384a6136ca02dc92243a8d36b4e7e87c91faf36
    })
})

module.exports = app