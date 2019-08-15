const mongoose = require('mongoose')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
})

const run = async () => {
    await mongoose.connect(
        'mongodb://admin:' +
        process.env.MONGO_ATLAS_PW +
        process.env.MONGO_ATLAS_CONNECT,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: 1000000,
            reconnectInterval: 3000
        }
    )
}

module.export = run().catch(error => console.error(error))