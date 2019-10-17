const assert = require('assert')
const expect = require('chai').expect
const mongoose = require('mongoose')

const User = require('../../api/models/user')

const data = [
    { 
        "email": "wally@example.com", 
        "role": "user",
        "active": true,
        "verified": false,
        "authyId": "i forget what this is",
        "fullName": "Wally B Webuilt",
        "company": "Bollard Corp",
        "countryCode": "IRL",
        "phone": "011 353 5551212",
        "password": "waLlyShasH",
    }
]

const fauxUser = new User({ 
    _id: new mongoose.Types.ObjectId(),
    ...data[0]
})


describe('saving User documents', () => {
    
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

    // it("find and update a User document", (done) => {
    //     User.findOneAndUpdate({symbol: priceHistory.symbol}, {symbol: update_symbol})
    //         .then( () => {
    //             fauxUser.findOne({_id: priceHistory._id})
    //                 .then( (result) => {
    //                     assert(result._id.toString() === priceHistory._id.toString())
    //                     assert(result.symbol === update_symbol)
    //                     done()
    //                 })
    //         })
    // })

    // it('nesting candle sub-document in fauxUser document', (done) => {
    //     fauxUser.findOneAndUpdate({symbol: update_symbol}, { $set: { candles }})
    //     .then( () => {
    //         done()
    //     })
    // })
})