<template>
  <v-layout row align-content-start>
    <v-dialog v-model="dialog" max-width="800px">
      <v-btn slot="activator" class="align-left" color="primary" dark>
        <v-icon class="mr-2">person_add</v-icon>
        Neuen Kunden anlegen
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Neuen Kunden anlegen</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs1>
              picture
            </v-flex>
            <v-flex xs10>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Präfix">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Vorname" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Zwischenname" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Nachname" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Suffix" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Nachname(phonetisch)" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Zweiter Vorname (phonetisch)" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Vorname (phonetisch)" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Nickname" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Speichern unter" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="business" label="Unternehmen" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="_" label="Postion" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="mail" label="Email" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="phone" label="Telefon" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="person_pin_circle" label="Land" id="id">
                  </v-text-field>
                  <v-autocomplete v-model="model" :items="items" :loading="isLoading" :search-input.sync="search" color="white" hide-no-data hide-selected item-text="Description" label="Land" prepend-icon="person_pin_circle" return-object></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Adresse" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Postleitzahl" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Stadt" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="_" label="Postfach" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="cake" label="Gebutstag" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="calendar_today" label="Veranstaltung" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="link" label="Website" id="id">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="notes" label="Notitzen" id="id">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs1>
              space
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="sumbit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
	data: () => ({
			dialog: false,
			date: null,
			menu: false,
      formData: {},
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null
		}),
	watch: {
		menu(val) {
			val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        axios.get(`https://restcountries.eu/rest/v2/name/${model}`)
          .then(res => {
            const { count, entries } = res.data
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    },
	methods: {
		save() {
			this.$refs.menu.save(this.menu)
		},
		sumbit(event) {
			this.$emit('submit', this.formData)
			this.dialog = false
			//console.log('gathered Form data: ', this.formData)
		}
	}
}
</script>

<style scoped>
</style>
