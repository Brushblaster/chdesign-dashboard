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
        Kunden Bearbeiten
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Kunden Bearbeiten</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                hide-details
                prepend-icon="search"
                single-line
                v-model="customer"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  autofocus
                  auto-grow
                  readonly
                  label="Kunde: "
                  placeholder="Kundendaten"
                  :value="`${customer.preName} ${customer.surName} \n${customer.street} ${customer.streetNr} \n${customer.zipCode} ${customer.city}`"
                  :key="i"
                  v-for="(customer, i) in customerData"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="findCustomer">Find</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveCustomer">Save</v-btn>
          <v-btn color="blue darken-1" flat @click.native="deleteCustomer">Delete</v-btn>
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
      formData: {},
      customer: null,
      customerData: []
    }
  },
  watch: {
    customer() {
      this.debouncedGetAnswer()
    },
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created() {
    this.debouncedGetAnswer = this._.debounce(this.findCustomer, 500)
  },
  methods: {
    save() {
      this.$refs.menu.save(this.menu)
    },
    saveCustomer(event) {
      this.$emit('saveCustomer', this.formData)
    },
    deleteCustomer(event) {
      console.log(this.customerData[0])
      this.$socket.emit('deleteCustomer', this.customerData[0])
      this.customer = null
    },
    findCustomer() {
      this.$socket.emit('findCustomer', this.customer)
    }
  },
  sockets: {
    findCustomer_res(customer) {
      console.log(customer)
      if (customer) {
        // this.customerData = `${customer[0].preName} ${customer[0].surName} \n${customer[0].street} ${customer[0].streetNr} \n${customer[0].zipCode} ${customer[0].city}`
        this.customerData = customer
      }
    },
    deleteCustomer_res(customer) {
      console.log(customer)
    }
  }
}
</script>

<style scoped>
</style>
