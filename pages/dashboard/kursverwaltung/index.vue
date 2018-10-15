<template>
  <v-content>
    <v-container grid-list-xs>
      <v-layout align-center justify-center row wrap>
        <v-flex xs11>
          <v-card>
            <v-card-title class="display-2 font-weight-thin" primary-title>
              Kursverwaltung
            </v-card-title>
            <div>
              <v-toolbar flat color="white">
                <v-btn @click="NewForm = !NewForm" color="primary" dark class="mb-2">Neuer Kurs</v-btn>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-btn @click="refresh" small fab color="primary" dark class="mb-2">
                  <v-icon>cached</v-icon>
                </v-btn>
              </v-toolbar>
              <v-data-table :headers="headers" :items="courses" hide-actions class="elevation-1">
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.CourseNumber }}</td>
                  <td class="text-xs-left">{{ props.item.CourseName }}</td>
                  <td class="text-xs-left">{{ props.item.StartDate }}</td>
                  <td class="text-xs-left">{{ props.item.EndDate }}</td>
                  <td class="text-xs-left">{{ props.item.StartTime }}</td>
                  <td class="text-xs-left">{{ props.item.EndTime }}</td>
                  <td class="text-xs-left">{{ props.item.City }}</td>
                  <td class="text-xs-left">{{ props.item.PlacesAvail }}</td>
                  <td class="text-xs-left">{{ props.item.PlacesFree }}</td>
                  <v-icon small class="mr-2" @click="editItem(props.item)">
                    edit
                  </v-icon>
                  <v-icon small @click="deleteItem(props.item)">
                    delete
                  </v-icon>
                </template>
              </v-data-table>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <NewCourseForm :courses="courses" :show="NewForm" />
  </v-content>
</template>

<script>
import NewCourseForm from '@/components/NewCourseForm'
export default {
	components: {
		NewCourseForm
	},
	data: () => ({
		fab: null,
		NewForm: false,
		tuggle: false,
		loading: false,
		toggleAll: false,
		headers: [
			{ text: 'KursNr.', align: 'left', value: 'CourseNumber' },
			{ text: 'Kursname', align: 'left', value: 'CourseName' },
			{ text: 'Start Datum', align: 'left', value: 'StartDate' },
			{ text: 'End Datum', value: 'EndDate' },
			{ text: 'Start Zeit', value: 'StartTime' },
			{ text: 'End Zeit', value: 'EndTime' },
			{ text: 'Ort', value: 'Location' },
			{ text: 'Anzahl Teilnehmer', value: 'PlacesFree' },
			{ text: 'Freie Plätze', value: 'PlacesAvail' }
		],
		courses: []
	}),
	mounted() {
		this.refresh()
	},
	computed: {},
	sockets: {
		setNewCourse_res(courses) {
			this.refresh()
		},
		findCourses_res() {
			this.refresh()
		},
		refreshAllCourses_res(courses) {
			console.log(courses)
			this.loading = false
			this.courses = courses
		},
		deleteCourse_res(courses) {
			console.log('deleted: ', courses)
			this.refresh()
		}
	},
	methods: {
		refresh() {
			this.loading = true
			this.$socket.emit('refreshAllCourses')
		},
		editItem(item) {
			const index = this.courses.indexOf(item)
			let id = this.courses[index]._id
			console.log(id)
			// this.editedItem = Object.assign({}, item)
			this.$socket.emit('editCourse', id)
			this.NewForm = !this.NewForm
		},

		deleteItem(item) {
			const index = this.courses.indexOf(item)
			let id = this.courses[index]._id
			this.$socket.emit('deleteCourse', id)
			this.courses.splice(index, 1)
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

.v-overlay:before {
	backdrop-filter: blur(3px);
}
</style>
