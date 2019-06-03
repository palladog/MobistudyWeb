<template>
  <div>
    <q-table title="Audit logs" ref="table" color="primary" :data="logs" selection="none" :columns="columns" :filter="filter" row-key="_key" :pagination.sync="pagination"  @request="loadLogs" :loading="loading">
      <template slot="top-right">
        <q-select :options="eventTypesOpts" v-model="filter.eventType" float-label="Event type" @input="updateFilters()" class="q-mr-sm"/>
        <q-datetime v-model="filter.after" type="date" float-label="From date" clearable @input="updateFilters()" class="q-mr-sm"/>
        <q-datetime v-model="filter.before" type="date" float-label="To date" clearable @input="updateFilters()" class="q-mr-sm"/>
        <q-input v-model="filter.userEmail" type="text" float-label="User email" clearable @input="updateFilters()"/>
      </template>
      <q-td slot="body-cell-timestamp" slot-scope="props" :props="props">
        {{ niceTimestamp(props.value) }}
      </q-td>
      <q-td slot="body-cell-data" slot-scope="props" :props="props">
        <q-btn v-if="props.value" flat icon="info"  @click="showLogData(props)"/>
      </q-td>
    </q-table>
    <q-modal v-model="logDataModal" :content-css="{minWidth: '50vw'}">
      <div class="q-pa-md">
        <div v-if="logDataType == 'raw'">
          <p class="q-title">
            Data:
          </p>
          <pre>
            {{ logDataModalContent }}
          </pre>
        </div>
        <div v-if="logDataType == 'healthStoreData'">
          <p class="q-title">
            Data from Google Fit / HealthKit: {{ logDataModalContent.dataType }}
          </p>
          <div v-for="(hd, index) in logDataModalContent.healthData" :key="index" class="q-ma-md">
            Start: {{ niceTimestamp(hd.startDate )}}<br />
            End: {{ niceTimestamp(hd.endDate) }}<br />
            Value: {{ hd.value }} {{ hd.unit }}
          </div>
        </div>
        <div v-if="logDataType == 'answers'">
          <div v-for="(answer, index) in logDataModalContent.responses" :key="index">
            <p class="q-title">
              {{ answer.questionText }}
            </p>
            <p v-if="answer.questionType == 'freetext'">
              {{ answer.answer }}
            </p>
            <p v-if="answer.questionType == 'singleChoice'">
              {{ answer.answer.answerText }}
            </p>
            <div v-if="answer.questionType == 'multiChoice'">
              <p v-for="(subanswer, index1) in answer.answer" :key="index1">
                {{ subanswer.answerText }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import API from '../modules/API.js'
import { date } from 'quasar'

export default {
  name: 'TableAuditLog',
  props: [
    'studyKey', // if set to -1, means that logs shouldn't be loaded until they are set a different value
    'taskId'
  ],
  data () {
    return {
      logs: [],
      pagination: { page: 1, rowsPerPage: 20, rowsNumber: 0, sortBy: 'timestamp', descending: true },
      columns: [
        { name: 'timestamp', required: true, label: 'Datetime', align: 'left', field: 'timestamp', sortable: true },
        { name: 'event', required: true, label: 'Event', align: 'right', field: 'event', sortable: false },
        { name: 'userEmail', required: true, label: 'User', align: 'right', field: 'userEmail', sortable: false },
        { name: 'message', required: true, label: 'Message', align: 'right', field: 'message', sortable: false },
        { name: 'data', required: false, label: 'Data', align: 'right', field: 'data', sortable: false }
      ],
      filter: {
        after: undefined,
        before: undefined,
        eventType: 'all',
        userEmail: undefined
      },
      eventTypesOpts: [],
      loading: false,
      logDataModal: false,
      logDataModalContent: undefined,
      logDataType: 'raw'
    }
  },
  async created () {
    this.getLogsEventTypes()
  },
  async mounted () {
    if (!this.studyKey || this.studyKey !== -1) {
      this.loadLogs({
        pagination: this.pagination,
        filter: this.filter
      })
    }
  },
  watch: {
    async studyKey () {
      this.filter.studyKey = this.studyKey
      this.loadLogs({
        pagination: this.pagination,
        filter: this.filter
      })
    }
  },
  methods: {
    niceTimestamp (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY HH:mm:ss')
    },
    async updateFilters () {
      this.loadLogs({
        filter: this.filter,
        pagination: this.pagination
      })
    },
    async loadLogs (params) {
      console.log('Loading logs...', this.studyKey)
      this.loading = true
      this.pagination = params.pagination
      try {
        let queryParams = {
          after: params.filter.after,
          before: params.filter.before,
          eventType: params.filter.eventType === 'all' ? undefined : params.filter.eventType,
          studyKey: params.filter.studyKey,
          taskId: params.filter.taskId,
          userEmail: params.filter.userEmail,
          sortDirection: params.pagination.descending ? 'DESC' : 'ASC',
          offset: (params.pagination.page - 1) * params.pagination.rowsPerPage,
          count: params.pagination.rowsPerPage
        }
        this.pagination.rowsNumber = await API.getLogs(true, queryParams)
        this.logs = await API.getLogs(false, queryParams)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve audit log' + err.message,
          icon: 'report_problem'
        })
      }
      this.loading = false
    },
    async getLogsEventTypes () {
      try {
        let types = await API.getLogEventTypes()
        if (types) {
          this.eventTypesOpts = types.map(evt => {
            return { label: evt, value: evt }
          })
        }
        this.eventTypesOpts.unshift({ label: 'All', value: 'all' })
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve logs event types',
          icon: 'report_problem'
        })
      }
    },
    showLogData (props) {
      if (props.row.refData === 'answers') {
        this.logDataType = 'answers'
        this.logDataModalContent = props.value
      } else if (props.row.refData === 'healthStoreData') {
        this.logDataType = 'healthStoreData'
        this.logDataModalContent = props.value
      } else {
        this.logDataType = 'raw'
        this.logDataModalContent = JSON.stringify(props.value, null, 2)
      }
      this.logDataModal = true
    }
  }
}
</script>
