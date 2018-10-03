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
    console.log('socket is connected !')

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

    socket.on('findCustomer', function(customer) {
      console.log(customer)
      db.CustomerDB.find({
        $or: [{preName:{$regex: customer, $options: 'i'}},{surName: {$regex: customer, $options: 'i'}}]})
        .then(customer => {
          console.log(customer)
          io.sockets.emit('findCustomer_res', customer)
        })
        .catch(error => console.log('could not finde Customer :', error))
    }),

    socket.on('deleteCustomer', function(customer) {
      console.log('to delete: ', customer)
      db.CustomerDB.findByIdAndDelete({_id: customer._id})
        .then(customer => {
          console.log('delete customer: ', customer)
          io.sockets.emit('deleteCustomer_res', customer)
        })
        .catch(error => console.log('could not delete Customer :', error))
    })
  })
}
