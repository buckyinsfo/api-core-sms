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

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env

const options = {
    autoIndex: false,                   // Don't build indexes
    reconnectTries: Number.MAX_VALUE,   // Never stop trying to reconnect
    reconnectInterval: 500,             // Reconnect every 500ms
    poolSize: 10,                       // Maintain up to 10 socket connections
                                        // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    autoReconnect: true,
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const run = async () => {
    await mongoose.connect( url, options )
}

module.export = run().catch(error => console.error(error))