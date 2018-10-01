<template>
  <v-layout
    row
    align-content-start>
    <v-dialog
      v-model="dialog"
      max-width="600px">
      <v-btn
        slot="activator"
        class="align-left"
        color="primary"
        dark>
        Neuer Kunde
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Neuen Kunden erfassen</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="formData.preName" label="Vorname" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="formData.preName2" label="Zweiter Vorname" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="formData.surName"
                  label="Nachname"
                  required
                ></v-text-field>
              <v-flex xs12 sm6 md4>
                <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="formData.birthDate"
                    label="Geburtsdatum"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="formData.birthDate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="formData.email" append-icon="email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs8>
                <v-text-field v-model="formData.street" append-icon="home" label="Strasse" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="formData.streetNr" label="Hausnummer" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="formData.zipCode" append-icon="mail" label="Postleitzahl" required></v-text-field>
              </v-flex>
              <v-flex xs8>
                <v-text-field v-model="formData.city" label="Ort" required></v-text-field>
              </v-flex>

              <v-flex xs8>
                <v-text-field append-icon="phone" label="Telefon" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
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
  data() {
    return {
      dialog: false,
      date: null,
      menu: false,
      formData: {}
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
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
