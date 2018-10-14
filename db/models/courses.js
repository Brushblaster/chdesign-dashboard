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
    required: [true, 'a number for this course is required']
  },
  StartDate: {
    type: Date,
    required: [true, 'Beginning Date is required']
  },
  EndDate: {
    type: Date,
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
  Location: {
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
    }

  },
  TimeStamp: {
    type: Date,
    default: Date.now()
  }

})

const CoursesModel = mongoose.model('CoursesModel', CoursesSchema)

module.exports = CoursesModel
