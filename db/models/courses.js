const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema




// Create customer database schema
const CoursesSchema = new Schema({
  CourseName: {
    type: String,
    required: [true, 'Name has to be deliverd']
  },
  CourseNumber: {
    type: Number,
    required: [true, 'CourseNumber has to be delivered'],
    default: 1
  },
  StartDate: {
    type: String,
    required: [true, 'Beginning Date is required']
  },
  EndDate: {
    type: String,
    required: [true, 'Ending Date is required']
  },
  StartTime: {
    type: String,
    required: [true, 'Starttime is required']
  },
  EndTime: {
    type: String,
    required: [true, 'Endingtime is required']
  },
  Street: {
    type: String
  },
  StreetNo: {
    type: Number
  },
  ZipCode: {
    type: Number
  },
  City: {
    type: String
  },
  PlacesFree: {
    type: Number,
  },
  PlacesAvail: {
    type: Number
  },
  TimeStamp: {
    type: Date,
    default: Date.now()
  }

})


const CoursesModel = mongoose.model('CoursesModel', CoursesSchema)



module.exports = CoursesModel
