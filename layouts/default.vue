<template>
  <v-app id="app" light>
    <v-navigation-drawer class="elevation-8 font-weight-light" width="250" dark v-model="drawer" app clipped :temporary="!this.$auth.loggedIn" color="primary" disable-resize-watcher>
      <v-toolbar class="white--text" dark color="primary" height="50px">
        <v-spacer />
        <v-btn icon @click="drawer = !drawer">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list v-if="this.$auth.loggedIn">
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in hiddenItems" exact :disabled="item.disable">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="elevation-8" dark app scroll-off-screen :scroll-threshold="treshold" color="primary" height="50">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title to="'/'" style="cursor: pointer" v-text="title">

      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, i) in hiddenItems" :key="i" router :to="item.to" flat small class="white--text" :disabled="item.disable">
          <v-icon size="18px" class="white--text pr-2">
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-btn v-if="this.$auth.loggedIn" flat @click="$auth.logout()">
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn v-else flat @click="$auth.loginWith('auth0')">
        <v-icon>lock</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- <v-content> -->
    <!-- <v-container fluid app> -->
    <nuxt />
    <!-- </v-container> -->
    <!-- </v-content> -->
    <v-footer fixed app>
      <span class="elevation-8 pl-2">&copy; 2018 / Denis Käch</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
	data() {
		return {
			clipped: false,
			drawer: false,
			fixed: false,
			hiddenItems: [
				{
					icon: 'fas fa-lock',
					title: 'Dashboard',
					to: '/dashboard',
					disable: !this.$store.state.auth.loggedIn
				},
				{
					icon: 'fas fa-home',
					title: 'Kundenverwaltung',
					to: '/dashboard/kundenverwaltung',
					disable: !this.$store.state.auth.loggedIn
				},
				{
					icon: 'fas fa-ribbon',
					title: 'Kursverwaltung',
					to: '/dashboard/kursverwaltung',
					disable: !this.$store.state.auth.loggedIn
				},
				{
					icon: 'fas fa-boxes',
					title: 'Auftragsverwaltung',
					to: '/dashboard/auftragsverwaltung',
					disable: !this.$store.state.auth.loggedIn
				}
			],
			rightDrawer: false,
			title: 'CH-Design GmbH Dashboard',
			treshold: 50
		}
	},
	methods: {}
}
</script>

<style scoped>
</style>

