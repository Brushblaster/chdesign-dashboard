const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const CustomerModel = require('./models/customers')
const CoursesModel = require('./models/courses')

const options = {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS
}

mongoose
  .connect(
    `mongodb://${process.env.MONGODB_ADDRESS_PROD}:27017/chdesign?authSource=admin`,
    options
  )
  .catch(error => console.log('uri error: ' + uri, error))




module.exports = {
  CustomerDB: CustomerModel,
  CoursesDB: CoursesModel
}
