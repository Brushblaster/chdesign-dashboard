<template>
  <v-content>
    <v-container
    fluid
    fill-height>
      <v-layout
      v-bind="binding"
      row
      align-start
      justify-center >
        <v-flex xs12>
          <v-card class="mb-3">
            <v-card-title class="display-1 font-weight-thin">
               Kundenverwaltung
            </v-card-title>
            <NewCustomerForm
            :dialog="dialog"
            @submit="submitCustomer"
            />
            <EditCustomerForm
            :dialog="dialog"
            @find="findCustomer"
            @save="saveCustomer"
            @delete="deleteCustomer"
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
import EditCustomerForm from '@/components/EditCustomerForm'

export default {
  components: {
    NewCustomerForm,
    CustomerList,
    EditCustomerForm
  },
  data: () => ({
    dialog: false
  }),
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
  methods: {
    submitCustomer(formData) {
      this.$socket.emit('setNewCustomer', formData)
      console.log('Data in parent compontent :', formData)
    },
    findCustomer(formData) {
      this.$socket.emit('findCustomer', formData)
    },
    saveCustomer(formdata) {
      this.$socket.emit('saveCustomer', formData)
    },
    deleteCustomer(formdata) {
      this.$socket.emit('deleteCustomer', formdata)
    }
  }
}
</script>

<style scoped>
</style>
