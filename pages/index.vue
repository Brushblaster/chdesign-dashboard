<template>
  <v-container>
    <v-layout align-center justify-center row fill-height wrap>
      <v-flex xs8>
        <v-card>
          <div class="py-3 display-2 text-xs-center">You need to Login !</div>
          <v-btn @click="$auth.loginWith('auth0')" block large color="success">Login</v-btn>
          <v-btn href="https://google.ch" block large color="primary" dark>Leave</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
	middleware: 'checkAlreadyAuth',
	components: {},
	data: () => ({}),
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
