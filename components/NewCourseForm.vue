<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">Neuen Kurs anlegen</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="Course.CourseName" label="Kursname" required></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-text-field v-model="Course.Street" label="Strasse"></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field v-model="Course.StreetNo" label="Hausnr." required></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field v-model="Course.ZipCode" label="Postleitzahl" required></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-text-field v-model="Course.City" label="Ort" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu ref="StartDatePicker" :close-on-content-click="false" v-model="StartDatePickerActive" :nudge-right="40" :return-value.sync="Course.StartDate" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field slot="activator" v-model="Course.StartDate" label="Start Datum" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker locale="ch-de" v-model="Course.StartDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="StartDatePicker = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.StartDatePicker.save(Course.StartDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu ref="StartTimePicker" :close-on-content-click="false" v-model="StartTimePickerActive" :nudge-right="40" :return-value.sync="Course.StartTime" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field slot="activator" v-model="Course.StartTime" label="Start Zeit" prepend-icon="access_time" readonly></v-text-field>
                  <v-time-picker format="24hr" v-if="StartTimePickerActive" v-model="Course.StartTime" full-width @change="$refs.StartTimePicker.save(Course.StartTime)"></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu ref="EndDatePicker" :close-on-content-click="false" v-model="EndDatePickerActive" :nudge-right="40" :return-value.sync="Course.EndDate" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field slot="activator" v-model="Course.EndDate" label="End Datum" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker locale="ch-de" v-model="Course.EndDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="EndDatePicker = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.EndDatePicker.save(Course.EndDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu ref="EndTimePicker" :close-on-content-click="false" v-model="EndTimePickerActive" :nudge-right="40" :return-value.sync="Course.EndTime" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field slot="activator" v-model="Course.EndTime" label="End Zeit" prepend-icon="access_time" readonly></v-text-field>
                  <v-time-picker format="24hr" v-if="EndTimePickerActive" v-model="Course.EndTime" full-width @change="$refs.EndTimePicker.save(Course.EndTime)"></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <div class="pb-3 body-2 font-weight-regular grey--text">Verfügbare Plätze</div>
                <v-slider max="10" v-model="Course.PlacesAvail" step="1" thumb-size="24" thumb-label="always" ticks></v-slider>
              </v-flex>
              <v-flex xs6>
                <div class="pb-3 body-2 font-weight-regular grey--text">Freie Plätze</div>
                <v-slider max="10" v-model="Course.PlacesFree" step="1" thumb-size="24" thumb-label="always" ticks></v-slider>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog= false">Abbrechen</v-btn>
          <v-btn color="blue darken-1" flat @click="submitForm">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		dialog: false,
		Course: {},
		Location: {},
		StartTime: null,
		EndTime: null,
		StartDate: null,
		EndDate: null,
		StartTimePickerActive: false,
		EndTimePickerActive: false,
		StartDatePickerActive: false,
		EndDatePickerActive: false
	}),
	watch: {
		show: {
			handler: function(newVal, oldVal) {
				this.dialog = !this.dialog
			}
		}
	},
	methods: {
		submitForm() {
			console.log('Set Course: ', this.Course)
			this.$socket.emit('setNewCourse', this.Course)
			this.dialog = false
		}
	}
}
</script>

<style>
.v-overlay:before {
	backdrop-filter: blur(2px);
}
</style>
