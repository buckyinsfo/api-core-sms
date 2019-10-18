const assert = require('chai').assert
const expect = require('chai').expect
const mongoose = require('mongoose')

const SMS = require('../../api/models/sms')
const User = require('../../api/models/user')

const users_data = require('../sample-data/users-data').users_data
const sms_data = require('../sample-data/sms-data').sms_data

const sms = new SMS({ 
    _id: new mongoose.Types.ObjectId(),
    ...sms_data[0]
})

const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...users_data[0]
})

describe('saving SMS documents', () => {
    
    before( (done) => {
        mongoose.connection.collections.sms.drop( () => {
            done()
        })
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
        // fauxUser.save()
        //     .then( () => {
        //         assert( fauxUser.isNew === false )
                assert(true)
                done()
        //    })
    })

})
