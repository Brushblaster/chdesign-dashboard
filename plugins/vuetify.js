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
    primary: "#01888b",
    secondary: "#2abfc5",
    accent: "#e8dcc2",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#00C853"
  },
  options: {
    themeChache
  }
})
