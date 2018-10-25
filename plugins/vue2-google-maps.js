import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/dist/main'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAJ-tMRUmy_HQrigRJLd1-vBMvQ8gS5IcE',
  },
  libraries: 'places,drawing,visualization',
  installComponents: true
})
