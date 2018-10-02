import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import LRU from 'lru-cache'

const themeChache = LRU({
  max: 10,
  maxAge: 1000 * 60 * 60
})

Vue.use(Vuetify, {
  theme: {
    primary: "#1DE9B6",
    secondary: "#4DB6AC",
    accent: "#0097A7",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#00C853"
  },
  options: {
    themeChache
  }
})
