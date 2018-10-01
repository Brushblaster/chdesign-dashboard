<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout row align-start justify-center v-bind="binding">
        <v-flex xs12>
          <v-card>
            <v-card-title class="display-1 font-weight-thin">
               Dashboard
            </v-card-title>
            <v-btn :to="'dashboard/kundenverwaltung'">
            Kundenverwaltung
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

export default {
  data: () => ({
  }),
  components: {
  },
  sockets: {
    createCustomer_res: function (data) {
      console.log('data recieved: ' + data)
      this.title = data
    }
  },
  middleware: ['checkAuth'],
  computed: {
       binding () {
        const binding = {}
        if (this.$vuetify.breakpoint.smAndUp) {
          binding.column = false
        } else if (this.$vuetify.breakpoint.xs) {
          binding.column = true
        }
        return binding
      }
    },
    methods: {
    },
    mounted () {
      this.$forceUpdate()
    }
}
</script>

<style scoped>

</style>
