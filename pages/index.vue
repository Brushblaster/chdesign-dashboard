<template>
  <v-content>
    <v-container
      fluid
      fill-height>
      <v-layout
        v-bind="binding"
        row
        align-start
        justify-center
      >
        <v-flex xs12>
          <v-card>
            <v-card-title class="display-1 font-weight-thin">
              Dashboard
            </v-card-title>
            <v-btn :to="'kundenverwaltung'">
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
  components: {},
  data: () => ({}),
  sockets: {
    createCustomer_res: function(data) {
      console.log('data recieved: ' + data)
      this.title = data
    }
  },
  middleware: [],
  computed: {
    binding() {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndUp) {
        binding.column = false
      } else if (this.$vuetify.breakpoint.xs) {
        binding.column = true
      }
      return binding
    }
  },
  mounted() {
    this.$forceUpdate()
  },
  methods: {}
}
</script>

<style scoped>
</style>
