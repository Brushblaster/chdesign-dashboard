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
  db.CoursesDB.find({})
    .then(courses => {
      if (courses) {
        res.json(courses)
      } else {
        res.sendStatus(405)
      }
    })
    .catch(err => console.log(err))
  next()
})

module.exports = {
  path: '/api',
  handler: app
}
