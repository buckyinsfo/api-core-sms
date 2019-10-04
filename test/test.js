const assert = require('assert')
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose')
const connection = require('../mongoose-connect')

// Use es6 implementation of promises
mongoose.Promise = global.Promise

before( (done) => {
    mongoose.connection
    .once('open', () => {
        done()
    })
    .on('error', (err) => {
        console.warn('DB connect error: ', err)
        done()
    })
})

beforeEach( (done) => {
    done()
})

after( (done) => {
    mongoose.connection.close()
    done()
})

// Basic sanity test
describe('top level sanity test', () => {
    it("add two numbers", () => {
        assert(2 + 2 === 4)
    })
})  