<template>
  <div>
    <q-table
      title="Users"
      ref="table"
      color="primary"
      :data="users"
      selection="none"
      :columns="columns"
      row-key="_key"
      @request="loadUsers"
    >
      <template #top-right>
        <q-select
          emit-value
          map-options
          :options="roleTypesOpts"
          v-model="filter.roleType"
          @input="updateFilters()"
          hint="Event"
          class="q-mr-sm"
          style="width: 150px"
        />
        <q-input
          type="text"
          v-model="filter.userEmail"
          @input="updateFilters()"
          hint="User email"
          clearable
          debounce="500"
        />
      </template>
      <template #body-cell-delete="props">
        <q-td :props="props">
          <q-btn
            label="Delete"
            color="negative"
            icon="remove"
            @click="deleteUser(props.row)"
          />
        </q-td>
      </template>
      <!-- Change row-key="_key" when it changes in the database (to be independent from ArangoDB) -->
      <!-- Add loading after you add filters and sorting -->
      <!-- INSERT <q-td> element (from TableAuditLog.vue) to include the delete button -->
    </q-table>
  </div>
</template>

<script>
import API from '../modules/API.js'
export default {
  name: 'TableUsers',
  // props: ['userKey'],
  data () {
    return {
      users: [],
      pagination: { page: 1, rowsPerPage: 20, rowsNumber: 0, sortBy: 'userkey', descending: true },
      columns: [
        { name: 'userkey', required: true, label: 'User Key', align: 'left', field: 'userkey', sortable: false }, // Change "_key" to "key" eventually
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'role', required: true, label: 'Role', align: 'left', field: 'role', sortable: false },
        { name: 'delete', required: true, label: 'Delete user', align: 'left', field: 'delete', sortable: false }
      ],
      filter: {
        userEmail: undefined,
        roleType: 'all'
      },
      roleTypesOpts: [],
      loading: false
    }
  },
  async created () {
    this.getRoleTypes()
  },
  async mounted () {
    this.loadUsers({
      pagination: this.pagination,
      filter: this.filter
    })
  },
  methods: {
    async getRoleTypes () {
      try {
        let types = await API.getRoleTypes()
        if (types) {
          this.roleTypesOpts = types.map(evt => {
            return { label: evt, value: evt }
          })
        }
        this.roleTypesOpts.unshift({ label: 'All', value: 'all' })
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve role types',
          icon: 'report_problem'
        })
      }
    },
    async loadUsers (params) {
      console.log('Loading users')
      this.loading = true
      this.pagination = params.pagination
      try {
        let queryParams = {
          roleType: params.filter.roleType === 'all' ? undefined : params.filter.roleType,
          userEmail: params.filter.userEmail,
          sortDirection: params.pagination.descending ? 'DESC' : 'ASC',
          offset: (params.pagination.page - 1) * params.pagination.rowsPerPage,
          count: params.pagination.rowsPerPage
        }
        this.pagination.rowsNumber = await API.getAllUsers(true, queryParams)
        this.users = await API.getAllUsers(false, queryParams)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve users' + err.message,
          icon: 'report_problem'
        })
      }
      this.loading = false
    },
    async updateFilters () {
      this.loadUsers({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    async deleteUser (user) {
      console.log('USER: ' + user.email)
      this.$q.dialog({
        title: 'Delete User',
        color: 'warning',
        message: 'You are deleting ' + user.role + ' ' + user.email + ' from the DB. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete user',
        cancel: 'Cancel'
      }).onOk(async () => {
        try {
          if (user.role === 'participant') {
            // Get participant key
            let partKey = await API.getOneParticipant(user._key)
            await API.deleteParticipant(partKey._key)
          } else {
            await API.deleteUser(user._key)
          }
          this.users.splice(user, 1)
          this.$q.notify('User ' + user.email + ' deleted')
          this.loadUsers()
        } catch (err) {
          console.debug(err)
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete user ' + user.email,
            icon: 'report_problem'
          })
        }
      })
    }
  }
}

</script>

<style>
.q-table td {
  border-color: black;
}
.q-table th {
  border-bottom-color: black;
}
.q-table__bottom {
  border-top: 1px solid black;
}
</style>
