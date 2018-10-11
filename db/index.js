const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const CustomerModel = require('./models/customers')

const options = {
  useNewUrlParser: true,
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

let buildUpUri =
  'mongodb://' +
  process.env.MONGODB_USER +
  ':' +
  process.env.MONGODB_PASS +
  '@' +
  process.env.MONGODB_ADDRESS_PROD +
  '/chdesign?authSource=admin'

let uri = buildUpUri

mongoose
  .connect(
    uri,
    options
  )
  .catch(error => console.log('uri error: ' + uri, error))

module.exports = {
  CustomerDB: CustomerModel
}
