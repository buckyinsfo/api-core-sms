const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authCheck = require('../auth/auth-check')

const UserController = require('../controllers/users')

router.get('/', authCheck, UserController.get_all )

router.get('/user', authCheck, UserController.get_user )

router.post('/login', UserController.login)

router.post('/signup', UserController.signup )

router.put('/update', authCheck, UserController.update )

router.post('/verify', UserController.verify )

router.delete('/:userId', authCheck, UserController.delete_byId)

router.post('/test', authCheck, UserController.test)

module.exports = router