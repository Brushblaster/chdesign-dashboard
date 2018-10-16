const db = require('../../db')
const express = require('express')
const app = express()


app.get('/', (req, res) => {
  console.log(req.path)
  res.json({
    it: 'works!'
  })
})

app.get('/live/courses', (req, res, next) => {
  db.CoursesDB.find({}, (err, courses) => {
    res.json(courses)
    if (err) {
      console.log(err)
    }
  })

})

module.exports = {
  path: '/api',
  handler: app
}
