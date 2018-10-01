/* const path = require('path')
// const db = require('../models')
const fs = require('fs')
const io = require('socket.io')({
  path: '/io'
}) */
const db = require('../db')

exports = module.exports = function(io) {
  io.sockets.on('connection', function(socket) {
    socket.emit('handshake', 'Handshake from server')
    /* socket.on('saveConfig', function (config) {
      db.CommConf.create(config)
        .then(CommConf => console.log(CommConf))
        .catch(error => console.log('Model Error: ', error))
    })
    socket.on('getLastConfig', function () {
      db.CommConf
        .find({
          config: 1
        }).limit(1)
        .where('config').ne(null)
        .sort('-createdOn')
        .then(CommConf => {
          console.log(CommConf)
          io.sockets.emit('getLastConfig_res', (CommConf[0]))
        })
        .catch(error => console.log(error))
    }) */
    console.log('socket is connected !')
    socket.on('createCustomer', function(customer) {
      console.log('fired')
      db.CustomerDB.create(customer)
        .then(CustomerDB => {
          console.log(CustomerDB)
          io.sockets.emit('createCustomer_res', CustomerDB)
        })
        .catch(error => console.log(error))
    })

    socket.on('setNewCustomer', function(customer) {
      console.log('fired')
      db.CustomerDB.create(customer)
        .then(CustomerDB => {
          console.log(CustomerDB)
          io.sockets.emit('setNewCustomer_res', CustomerDB)
        })
        .catch(error => console.log(error))
    })

    socket.on('refreshAllCustomers', function(socket) {
      console.log('refreshAllCustomers recieved')
      db.CustomerDB.find({})
        .then(CustomerDB => {
          io.sockets.emit('refreshAllCustomers_res', CustomerDB)
        })
        .catch(error => console.log('DB Model Err: ', error))
    })
  })
}
