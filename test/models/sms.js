const assert = require('chai').assert
const expect = require('chai').expect
const mongoose = require('mongoose')

const SMS = require('../../api/models/sms')
const User = require('../../api/models/user')

const users_data = require('../sample-data/users-data').users_data
const sms_data = require('../sample-data/sms-data').sms_data
const update_msg = require('../sample-data/sms-data').update_msg

const fauxUser = new User({
    _id: new mongoose.Types.ObjectId(),
    ...users_data[0],
})

const sms = new SMS({ 
    _id: new mongoose.Types.ObjectId(),
    user: fauxUser._id,
    ...sms_data[0],
})

describe('saving SMS documents', () => {
    
    before( (done) => {
        
        try {
            mongoose.connection.collections.users.drop()
        } catch (err) {
            if (err.code === 26) {
                console.log('namespace %s not found', mongoose.connection.collection.name)
              } else {
                throw err
              }
        }

        try {
            mongoose.connection.collections.sms.drop()
        } catch (err) {
            if (err.code === 26) {
                console.log('namespace %s not found', mongoose.connection.collection.name)
              } else {
                throw err
              }
        }

        done()
    })

    it("should be invalid if user value not present", (done) => {
        const s = new SMS({
            _id: new mongoose.Types.ObjectId(),
        })

        s.validate( (err) => {
            expect(err.errors.user.name).to.equals( "ValidatorError" )
        })
        
        done()
    })
    
    it("should be invalid if phoneNumber value not present", (done) => {
        const s = new SMS({
            _id: new mongoose.Types.ObjectId(),
        })

        s.validate( (err) => {
            expect(err.errors.phoneNumber.name).to.equals( "ValidatorError" )
        })
        
        done()
    })
    
    it("should be invalid if msg value not present", (done) => {
        const s = new SMS({
            _id: new mongoose.Types.ObjectId(),
        })

        s.validate( (err) => {
            expect(err.errors.msg.name).to.equals( "ValidatorError" )
        })
        
        done()
    })

    it("save an SMS document", (done) => {
        
        fauxUser.save()
            .then( () => {
                assert( fauxUser.isNew === false )
            })
        
        sms.save()
            .then( () => {
                assert( sms.isNew === false )
                done()
            })
    })

    it("find an SMS document by phoneNumber", (done) => {
        SMS.findOne({phoneNumber: sms_data.phoneNumber})
            .populate('user')
            .then( (result) => {
    //            assert(result.phoneNumber === sms_data.phoneNumber)
                done()
            })
    })

    it("find an SMS document by _id", (done) => {
        SMS.findOne({_id: sms._id})
            .populate('user')
            .then( (result) => {
                assert(result._id.toString() === sms._id.toString())
                done()
            })
    })

    it("find and update an SMS document", (done) => {
        SMS.findOneAndUpdate({_id: sms._id}, {msg: update_msg})
                .then( () => {
                SMS.findOne({_id: sms._id})
                    .then( (result) => {
                        assert(result._id.toString() === sms._id.toString())
                        assert(result.msg === update_msg)
                        done()
                    })
            })
    })
})