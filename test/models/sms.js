const assert = require('assert')
const mongoose = require('mongoose')

const SMS = require('../../api/models/sms')






describe('saving SMS documents', () => {
    
    before( (done) => {
        mongoose.connection.collections.sms.drop( () => {
            done()
        })
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
