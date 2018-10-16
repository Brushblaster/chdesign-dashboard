require('dotenv').config()
const express = require('express')
const consola = require('consola')
const cors = require('cors')
const {
  Nuxt,
  Builder
} = require('nuxt-edge')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  path: '/io'
})
require('./socket')(io)

app.set('port', port)

app.use(cors())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
