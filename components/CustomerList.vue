<template>
  <v-content>
    <!-- <v-btn @click="refreshingData" icon>
      <v-icon>
        cached
      </v-icon>
    </v-btn> -->
    <v-card-text>
    <v-text-field
        v-model="search"
        append-icon="search"
        label="Suche"
        single-line
        hide-details
      ></v-text-field>      
    </v-card-text>
    <v-data-table :search="search" :pagination.sync="pagination" :total-items="totalCustomers" :headers="headers" :items="customers" :loading="loading" class="elevation-8" item-key="surName">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-left">{{ props.item.preName }} {{ props.item.surName }}</td>
          <td class="text-xs-left">{{ props.item.street }} {{ props.item.streetNr }}</td>
          <td class="text-xs-left">{{ props.item.zipCode }} {{ props.item.city }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.phone1 }}</td>
          <td class="text-xs-left">{{ props.item.bithday }}</td>

        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-layout row wrap>
            <v-flex xs6>

              <v-card-text>Kunde Bearbeiten</v-card-text>
              <v-textarea class="mb-0 pt-0" background-color="#c7d1e2" autofocus readonly label="Adresse: " placeholder="Kundendaten" :value="`${props.item.sex} \n${props.item.preName} ${props.item.surName} \n${props.item.street} ${props.item.streetNr} \n${props.item.zipCode} ${props.item.city}`"></v-textarea>
            </v-flex>
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon>
          </v-layout>
        </v-card>
      </template>
      <template slot="pageText" slot-scope="props">
        Einträge {{ props.pageStart }} - {{ props.pageStop }} von {{ props.itemsLength }}
      </template>
    </v-data-table>
  </v-content>
</template>

<script>
export default {
	data: () => ({
		loading: false,
		headers: [
			{ text: 'Name', align: 'left', value: 'surName' },
			{ text: 'Adresse', value: 'street' },
			{ text: 'Ort', value: 'city' },
			{ text: 'E-Mail', value: 'mail' },
			{ text: 'Mobil', value: 'phone1' },
			{ text: 'Geburtstag', value: 'birthday' }
		],
		customers: [],
		pagination: {},
		totalCustomers: 0,
		autocomplete: [],
		model: null,
    search: '',
	}),
	watch: {
		pagination: {
			handler() {
				this.refreshingData()
			},
			deep: true
		}
	},
	mounted() {},
	methods: {
		refreshingData() {
			this.loading = true
			this.$socket.emit('refreshAllCustomers')
		},
		editItem(item) {
			const index = this.customers.indexOf(item)
			let id = this.customers[index]._id
			console.log(id)
			// this.editedItem = Object.assign({}, item)
			//this.$socket.emit('editCustomer', id)
			//this.NewForm = !this.NewForm
		},

		deleteItem(item) {
			const index = this.customers.indexOf(item)
			let id = this.customers[index]._id
			//this.$socket.emit('deleteCustomer', id)
			//this.courses.splice(index, 1)
		}
	},
	sockets: {
		refreshAllCustomers_res(customers) {
			console.log(customers)
			this.loading = false
			this.customers = customers
			for (let item of this.customers) {
				this.autocomplete.push(item.preName, item.surName)
			}
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
