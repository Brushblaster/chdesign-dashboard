<template>
  <v-content>
    <v-btn @click="refreshingData" icon>
      <v-icon>
        cached
      </v-icon>
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="customers"
      hide-actions
      :loading="loading"
      class="elevation-1"
    >
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
  </v-content>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    headers: [
      { text: 'Vorname', align: 'left', value: 'preName' },
      { text: 'Nachname', value: 'surName' },
      { text: 'Strasse', value: 'street' },
      { text: 'Hausnummer', value: 'streetNr' },
      { text: 'PLZ', value: 'zipCode' },
      { text: 'Ort', value: 'city' },
      { text: 'Geburtstag', value: 'birthday' }
    ],
    customers: []
  }),
  mounted() {},
  methods: {
    refreshingData() {
      this.loading = true
      this.$socket.emit('refreshAllCustomers')
    }
  },
  sockets: {
    refreshAllCustomers_res(customers) {
      console.log(customers)
      this.loading = false
      this.customers = customers
    },
    setNewCustomer_res() {
      this.refreshingData()
    }
  },
  mounted() {
    this.refreshingData()
  }
}
</script>

<style scoped>
</style>
