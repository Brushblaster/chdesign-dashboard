import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'
import io from 'socket.io-client'

let prodHost = `http://app.${process.env.PROD_DOMAIN}`

Vue.use(
  VueSocketIo,
  io(
    process.env.NODE_ENV === 'production'
      ? prodHost
      : process.env.SOCKET_HOST_URL,
    {
      path: '/io'
    }
  )
)

/* const socket = io(process.env.SOCKET_HOST_URL, {
  path: '/io'
})
 */
