<template>
  <div>
    <q-table
      title="Teams"
      ref="table"
      color="primary"
      :data="teams"
      selection="none"
      :columns="columns"
      :filter="filter"
      row-key="_key"
      :pagination.sync="pagination"
      @request="loadTeams"
      :loading="loading"
    >
      <template #top-right>
        <q-input
          v-model="filter.after"
          type="date"
          hint="From date"
          clearable
          class="q-mr-sm"
        />
        <q-input
          v-model="filter.before"
          type="date"
          hint="To date"
          clearable
          class="q-mr-sm"
        />
        <q-input
          v-model="filter.teamName"
          type="text"
          hint="Team name"
          clearable
          debounce="500"
        />
      </template>
      <template #body-cell-created="props">
        <q-td :props="props">
          {{ niceTimestamp(props.value) }}
        </q-td>
      </template>
      <template #body-cell-expiry="props">
        <q-td :props="props">
          {{ niceTimestamp(props.value) }}
        </q-td>
      </template>
      <template #body-cell-code="props">
        <q-td :props="props" :style="{width: '400px', whiteSpace: 'normal'}">
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-generate="props">
        <q-td :props="props">
          <q-btn
            color="purple"
            icon="add"
            @click="generateCode(props.row)"
          />
        </q-td>
      </template>
      <template #body-cell-delete="props">
        <q-td :props="props">
          <q-btn
            label="Delete"
            color="negative"
            icon="remove"
            @click="deleteTeam(props.row)"
          />
        </q-td>
      </template>
      <!-- TO-DO: get list of researchers
        <template #body-cell-members="props">
        <q-td :props="props"
          v-if="props.value"
          flat
          icon="info"
          @click="showTeamMembers(props)"
        />
      </template>-->
    </q-table>
  </div>
</template>

<script>
import API from '../modules/API.js'
import { date } from 'quasar'

export default {
  name: 'TableTeams',
  data () {
    return {
      teams: [],
      pagination: { page: 1, rowsPerPage: 20, rowsNumber: 0, sortBy: 'teamName', descending: true },
      columns: [
        { name: 'name', required: true, label: 'Team Name', align: 'left', field: 'teamName', sortable: true },
        { name: 'teamkey', required: true, label: 'Team Key', align: 'left', field: 'teamKey', sortable: false },
        { name: 'created', required: true, label: 'Created', align: 'left', field: 'createdTS', sortable: true },
        { name: 'code', required: false, label: 'Invitation Code', align: 'left', field: 'invitationCode', sortable: false },
        { name: 'expiry', required: false, label: 'Expiry Date', align: 'left', field: 'invitationExpiry', sortable: false },
        { name: 'generate', required: true, label: 'Generate new invitation code', align: 'left', field: 'generateCode', sortable: false },
        // { name: 'members', required: true, label: 'Team Members', field: 'teamMembers', sortable: false }
        { name: 'delete', required: true, label: 'Delete team', align: 'left', field: 'delete', sortable: false }
      ],
      filter: {
        after: undefined,
        before: undefined,
        teamName: undefined
      },
      loading: false,
      teamMembersModal: false,
      teamMembersModalContent: undefined
    }
  },
  async mounted () {
    this.loadTeams({
      pagination: this.pagination,
      filter: this.filter
    })
  },
  methods: {
    niceTimestamp (timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    async loadTeams (params) {
      this.loading = true
      this.pagination = params.pagination
      try {
        let queryParams = {
          after: params.filter.after,
          before: params.filter.before ? new Date(new Date(params.filter.before).getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0, 10) : undefined, // the before must add 24 hours to include the whole day
          teamName: params.filter.teamName,
          sortDirection: params.pagination.descending ? 'DESC' : 'ASC',
          offset: (params.pagination.page - 1) * params.pagination.rowsPerPage,
          rowsPerPage: params.pagination.rowsPerPage === 0 ? undefined : params.pagination.rowsPerPage
        }
        console.log('TABLETEAMS queryParams: ', queryParams)
        this.pagination.rowsNumber = await API.getAllTeams(true, queryParams)
        this.teams = await API.getAllTeams(false, queryParams)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve teams' + err.message,
          icon: 'report_problem'
        })
      }
      this.loading = false
    },
    async deleteTeam (team) {
      let teamName = team.teamName
      this.$q.dialog({
        title: 'Delete Team',
        color: 'warning',
        message: 'You are deleting the team ' + teamName + ' from the DB. This will also delete all associated studies and corresponding data. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete team' + teamName,
        cancel: 'Cancel'
      }).onOk(async () => {
        try {
          await API.deleteTeam(team.teamKey)
          this.$q.notify('Team ' + teamName + ' deleted')
          this.loadTeams({
            pagination: this.pagination,
            filter: this.filter
          })
        } catch (err) {
          console.error(err)
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete team ' + teamName,
            icon: 'report_problem'
          })
        }
      })
    },
    async generateCode (team) {
      try {
        await API.generateTeamCode(team.teamKey)
        this.loadTeams({
          pagination: this.pagination,
          filter: this.filter
        })
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot generate invitation code',
          icon: 'report_problem'
        })
      }
    },
    showTeamMembers (team) {
      // TO-DO: Gets team members' emails
      this.teamMembersModalContent = team
      this.teamMembersModal = true
    }
  }
}
</script>
