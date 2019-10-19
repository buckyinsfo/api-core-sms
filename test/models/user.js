const assert = require('chai').assert
const expect = require('chai').expect
const mongoose = require('mongoose')

const User = require('../../api/models/user')
const users = require('../sample-data/users-data').users_data
const update_email = require('../sample-data/users-data').update_email

describe('saving User documents', () => {
    
    const fauxUser = new User({ 
        _id: new mongoose.Types.ObjectId(),
        ...users[0]
    })
    
    before( (done) => {
        mongoose.connection.collections.users.drop( () => {
            done()
        })
    })

    it("should be invalid if passwword value not present", (done) => {
        const u = new User({
            _id: new mongoose.Types.ObjectId(),
        })

        u.validate( (err) => {
            expect(err.errors.password.name).to.equals( "ValidatorError" )
        })
        
        done()
    })
    
    it("should be invalid if phone value not present", (done) => {
        const u = new User({
            _id: new mongoose.Types.ObjectId(),
        })

        u.validate( (err) => {
            expect(err.errors.phone.name).to.equals( "ValidatorError" )
        })
        
        done()
    })
    
    it("should be invalid if countryCode value not present", (done) => {
        const u = new User({
            _id: new mongoose.Types.ObjectId(),
        })

        u.validate( (err) => {
            expect(err.errors.countryCode.name).to.equals( "ValidatorError" )
        })
        
        done()
    })
    
    it("should be invalid if fullName value not present", (done) => {
        const u = new User({
            _id: new mongoose.Types.ObjectId(),
        })

        u.validate( (err) => {
            expect(err.errors.fullName.name).to.equals( "ValidatorError" )
        })
        
        done()
    })

    it("should be invalid if email value not present", (done) => {
        const u = new User({
            _id: new mongoose.Types.ObjectId(),
        })

        u.validate( (err) => {
            expect(err.errors.email.name).to.equals( "ValidatorError" )
        })
        
        done()
    })
    
    it("save a User document", (done) => {
        fauxUser.save()
            .then( () => {
                assert( fauxUser.isNew === false )
                done()
            })
    })

    it("find a User document by email", (done) => {
        User.findOne({email: fauxUser.email})
            .then( (result) => {
                assert(result.email === fauxUser.email)
                done()
            })
    })

    it("find a User document by _id", (done) => {
        User.findOne({_id: fauxUser._id})
            .then( (result) => {
                assert(result._id.toString() === fauxUser._id.toString())
                done()
            })
    })

    it("find and update a User document", (done) => {
        User.findOneAndUpdate({email: fauxUser.email}, {email: update_email})
            .then( () => {
                User.findOne({_id: fauxUser._id})
                    .then( (result) => {
                        assert(result._id.toString() === fauxUser._id.toString())
                        assert(result.email === update_email)
                        done()
                    })
            })
    })
})