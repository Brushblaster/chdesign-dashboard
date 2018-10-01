<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout row align-start justify-center v-bind="binding">
        <v-flex xs12>
          <v-card class="mb-3">
            <v-card-title class="display-1 font-weight-thin">
               Kundenverwaltung
            </v-card-title>
            <NewCustomerForm
            :dialog="dialog"
            @submit="submitCustomer"
            />
          </v-card>
          <v-card>
            <v-card-title class="headline font-weight-thin">
               Kunden
            </v-card-title>
            <CustomerList

            />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import NewCustomerForm from '@/components/NewCustomerForm'
import CustomerList from '@/components/CustomerList'
export default {
  data: () => ({
    dialog: false
  }),
  middleware: ['checkAuth'],
  components: {
    NewCustomerForm,
    CustomerList
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
      newCustomer () {
        console.log('DB')
        this.$socket.emit('createCustomer', {
          preName: 'Hans',
          surName: 'Muster',
          street: 'Musterstrasse',
          streetNr: 4,
          city: 'Musterhausen',
          zipCode: 4563
          })
      },
      submitCustomer (formData) {
        this.$socket.emit('setNewCustomer', formData)
        console.log('Data in parent compontent :', formData)
      }
    },
    mounted () {
      this.$forceUpdate()
    }
}
</script>

<style scoped>

</style>
