const mongoose = require('mongoose')
const User = require('../models/user')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authToken = process.env.TWILIO_AUTH_TOKEN
const accountSid = process.env.TWILIO_ACCOUNT_SID

const twilio = require('twilio')(accountSid, authToken)

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email exits"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log("bcrypt error")
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            fullName: req.body.fullName,
                            phone: req.body.phone,
                            countryCode: req.body.countryCode
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err,
                                })
                            })
                    }
                })
            }
        })
}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth fail',
                    body: req.body
                })
            }
            bcrypt.compare( req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth fail',
                    })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                        }, 
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: "24hr",
                        })
                    
                    return res.status(200).json({
                        message: 'Auth success',
                        token: token,
                    })
                }
                res.status(401).json({
                    message: 'Auth fail',
                 })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
}

exports.get_all = (req, res, next) => {
    User.find()
        .select( "_id email role active phone countryCode" )
        .exec()
        .then( docs => {
            const response = {
                count: docs.length,
                users: docs.map( doc => {
                    return { user: doc }
                })
            }
            res.status(200).json( response )
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
}

exports.get_user = (req, res, next) => {

    User.find({ email: req.query.email })
        .exec()
        .then( user => {
            if (user.length > 0) {
                return res.status(200).json({
                    message: 'Success',
                    user: user[0],
                })
            } else {
                return res.status(402).json({
                    message: 'Auth fail',
                })
            }
        })
}

exports.delete_byId = (req, res, next) => {
    User.remove({
        _id: req.params.userId
    })
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'User deleted',
            })
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
}

exports.verify = (req, res, next) => {
    User.find({ _id: req.body.id })
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Token invalid',
                })
            }
            
            user.verifyAuthyToken({ authyId: req.body.code }, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token invalid',
                    })
                }
                if (result) {
                    user.verified = true;
                    user.save(postSave);
                    

                        return res.status(200).json({
                        message: 'Verify success',
                        token: token,
                    })
                }
                res.status(401).json({
                    message: 'Token invalid',
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
}

exports.update = (req, res, next) => {
    User.find({ _id: req.body.id })
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Token invalid',
                })
            }
            
            user.verifyAuthyToken({ authyId: req.body.code }, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token invalid',
                    })
                }
                if (result) {
                    user.verified = true;
                    user.save(postSave);
                    

                        return res.status(200).json({
                        message: 'Verify success',
                        token: token,
                    })
                }
                res.status(401).json({
                    message: 'Token invalid',
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err,
            })
        })
}

exports.test = (req, res, next) => {
    res.status(200).json({
        msg: "this is a test!",
        body: req.body,
    })
}