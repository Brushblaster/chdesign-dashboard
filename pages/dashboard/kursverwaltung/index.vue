<template>
  <v-content>
    <v-container grid-list-xs>
      <v-layout align-center justify-center row wrap>
        <v-flex xs11>
          <v-card>
            <v-card-title class="display-2 font-weight-thin" primary-title>
              Kursverwaltung
            </v-card-title>
            <v-flex offset-xs11 xs1>
              <div>
                <v-speed-dial open-on-hover v-model="fab" top right direction="bottom">
                  <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
                    <v-icon>list</v-icon>
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="red">
                    <v-icon>cached</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="indigo">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="green">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="red">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-speed-dial>
              </div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs11>
          <v-data-table :headers="headers" :items="customers" hide-actions :loading="loading" class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.preName }}</td>
              <td class="text-xs-left">{{ props.item.surName }}</td>
              <td class="text-xs-left">{{ props.item.street }}</td>
              <td class="text-xs-left">{{ props.item.streetNr }}</td>
              <td class="text-xs-left">{{ props.item.zipCode }}</td>
              <td class="text-xs-left">{{ props.item.city }}</td>
              <td class="text-xs-left">{{ props.item.bithday }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
	data: () => ({
		fab: null,
		tuggle: false,
		headers: [
			{ text: 'Kursnummer', align: 'left', value: 'preName' },
			{ text: 'Kursname', align: 'left', value: 'preName' },
			{ text: 'End Datum', value: 'surName' },
			{ text: 'Start Datum', align: 'left', value: 'preName' },
			{ text: 'End Datum', value: 'surName' },
			{ text: 'Ort', value: 'street' },
			{ text: 'Start Zeit', value: 'streetNr' },
			{ text: 'End Zeit', value: 'zipCode' },
			{ text: 'Anzahl Teilnehmer', value: 'city' },
			{ text: 'Freie Plätze', value: 'birthday' }
		],
		courses: []
	}),
	computed: {},
	sockets: {
		setNewCourse_res(courses) {
			console.log(courses)
			this.loading = false
			this.courses = courses
		},
		findCourses_res() {
			// this.refreshingData()
		}
	}
}
</script>

<style scoped>
#create .v-speed-dial {
	position: absolute;
}

#create .v-btn--floating {
	position: relative;
}
</style>
