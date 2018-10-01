const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const CustomerModel = require('./models/customers')

const options = {
  useNewUrlParser: true
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
