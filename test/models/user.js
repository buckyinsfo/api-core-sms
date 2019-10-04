const assert = require('assert')
const mongoose = require('mongoose')

const User = require('../../api/models/user')
/*
const user = [
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
        "password": "waLlyShasH,
    }
]

describe('saving records', () => {
    
    const fauxUser = new User({
        _id: new mongoose.Types.ObjectId()
    })

    before( (done) => {
        mongoose.connection.collections.pricehistories.drop( () => {
            done()
        })
    })

    it("save a PriceHistory document", (done) => {
        fauxUser.save()
                    .then( () => {
                        assert( priceHistory.isNew === false )
                        done()
                    })
    })

    it("find a PriceHistory document by symbol", (done) => {
        fauxUser.findOne({symbol: symbol})
            .then( (result) => {
                assert(result.symbol === priceHistory.symbol)
                done()
            })
    })

    it("find a PriceHistory document by _id", (done) => {
        fauxUser.findOne({_id: priceHistory._id})
            .then( (result) => {
                assert(result._id.toString() === priceHistory._id.toString())
                done()
            })
    })

    it("find and update a PriceHistory document", (done) => {
        fauxUser.findOneAndUpdate({symbol: priceHistory.symbol}, {symbol: update_symbol})
            .then( () => {
                fauxUser.findOne({_id: priceHistory._id})
                    .then( (result) => {
                        assert(result._id.toString() === priceHistory._id.toString())
                        assert(result.symbol === update_symbol)
                        done()
                    })
            })
    })

    it('nesting candle sub-document in fauxUser document', (done) => {
        fauxUser.findOneAndUpdate({symbol: update_symbol}, { $set: { candles }})
        .then( () => {
            done()
        })
    })
}) 
*/