const db = require('../../../db')
const {
  Router
} = require('express')
const router = Router()

// defining Api routes to get courses from

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('request on api recieved', req)
  next() // make sure we go to the next routes and don't stop here
})

router.get('/live/courses', (req, res, next) => {
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


module.export = router
