<template>
  <div>
    <q-table
      title="Studies"
      ref="table"
      color="primary"
      :data="studies"
      selection="none"
      :columns="columns"
      row-key="_key"
      @request="loadStudies"
    >
      <!-- Change row-key="_key" when it changes in the database (to be independent from ArangoDB) -->
      <template #top-right>
        <q-input
          type="text"
          v-model="filter.studyTitle"
          @input="updateFilters()"
          hint="Study Title"
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
            @click="deleteStudy(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import API from '../modules/API.js'
export default {
  name: 'TableStudies',
  data () {
    return {
      studies: [],
      pagination: { page: 1, rowsPerPage: 20, rowsNumber: 0, sortBy: 'published', descending: true },
      columns: [
        { name: 'studyKey', required: true, label: 'Study Key', align: 'left', field: 'studykey', sortable: false }, // Change "_key" to "key" eventually
        { name: 'studyTitle', required: true, label: 'Title', align: 'left', field: 'title', sortable: true },
        { name: 'teamName', required: true, label: 'Team Name', align: 'left', field: 'teamName', sortable: false },
        { name: 'created', required: true, label: 'Created', align: 'left', field: 'createdTS', sortable: true },
        { name: 'published', required: true, label: 'Published', align: 'left', field: 'publishedTS', sortable: true },
        { name: 'delete', required: true, label: 'Delete Study', align: 'left', field: 'delete', sortable: false }
      ],
      filter: {
        studyTitle: undefined
      },
      loading: false
    }
  },
  async mounted () {
    this.loadStudies({
      pagination: this.pagination,
      filter: this.filter
    })
  },
  methods: {
    async loadStudies (params) {
      this.loading = true
      this.pagination = params.pagination
      try {
        let queryParams = {
          studyTitle: params.filter.studyTitle,
          sortDirection: params.pagination.descending ? 'DESC' : 'ASC',
          offset: (params.pagination.page - 1) * params.pagination.rowsPerPage,
          rowsPerPage: params.pagination.rowsPerPage
        }
        this.pagination.rowsNumber = await API.getAllStudies(true, queryParams)
        this.studies = await API.getAllStudies(false, queryParams)
        console.log('TABLESTUDIES RECEIVED DATA:', this.studies)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve studies list',
          icon: 'report_problem'
        })
      }
      this.loading = false
    },
    async updateFilters () {
      this.loadStudies({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    // Delete STUDY from Db
    async deleteStudy (index) {
      let study = this.studies[index]
      this.$q.dialog({
        title: 'Deleting Study',
        color: 'warning',
        message: 'You are deleting the study ' + study.generalities.title + ' from the DB. This will affect participants of that study ' +
        ' and they will no longer be associated to that study. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete Study',
        cancel: 'Cancel'
      }).onOk(async () => {
        try {
          await API.deleteStudy(study._key)
          this.allUsers.splice(index, 1)
          this.$q.notify('Study ' + study.generalities.title + ' Deleted')
          this.loadStudies({
            pagination: this.pagination,
            filter: this.filter
          })
        } catch (err) {
          console.debug(err)
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete study ' + study.generalities.title,
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
