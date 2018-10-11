const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// Create customer database schema
const CoursesSchema = new Schema({
  preName: {
    type: String,
    required: [true, 'pre name is required']
  },
  surName: {
    type: String,
    required: [true, 'sur name is required']
  },
  street: {
    type: String,
    required: [true, 'street is required']
  },
  streetNr: {
    type: Number,
    required: [true, 'street number is required']
  },
  zipCode: {
    type: Number,
    required: [true, 'zip code must be supplied']
  },
  city: {
    type: String,
    required: [true, 'city must be supplied']
  }
})

const CoursesModel = mongoose.model('CoursesModel', CoursesSchema)

module.exports = CoursesModel
