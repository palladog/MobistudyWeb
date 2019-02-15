<template>
  <q-tab-pane name="tab-study-stats">
    <q-card>
      <q-card-title>Participants
      </q-card-title>
      <q-card-main>
        <div class="row justify-around">
          <div class="col-3">
            <div class="q-title">
              Joined
            </div>
            <div class="q-display-3">
              {{ participants.joined }}
            </div>
          </div>
          <div class="col-3">
            <div class="q-title">
              Active
            </div>
            <div class="q-display-3">
              {{ participants.active }}
            </div>
          </div>
          <div class="col-3">
            <div class="q-title">
              Completed
            </div>
            <div class="q-display-3">
              {{ participants.completed }}
            </div>
          </div>
          <div class="col-3">
            <div class="q-title">
              Withdrawn
            </div>
            <div class="q-display-3">
              {{ participants.withdrawn }}
            </div>
          </div>
        </div>

        <div class="row q-ma-lg">
          <q-btn label="Download data"></q-btn>
        </div>

        <table-audit-log :studyKey="studyDesign._key"/>
      </q-card-main>
    </q-card>

  </q-tab-pane>
</template>

<script>
import API from '../data/API'
import TableAuditLog from '../components/TableAuditLog'

export default {
  name: 'TabPaneStudyStats',
  props: ['studyDesign'],
  components: {
    TableAuditLog
  },
  data () {
    return {
      participants: {
        joined: 0,
        active: 0,
        completed: 0,
        withdrawn: 0
      }
    }
  },
  watch: {
    async studyDesign () {
      if (this.studyDesign._key) {
        try {
          let stats = await API.getParticipantsStatusStats(this.studyDesign._key)
          for (let stat of stats) {
            if (stat.status === 'accepted') {
              this.participants.joined += stat.count
              this.participants.active = stat.count
            }
            if (stat.status === 'completed') {
              this.participants.joined += stat.count
              this.participants.completed = stat.count
            }
            if (stat.status === 'withdrawn') {
              this.participants.joined += stat.count
              this.participants.withdrawn = stat.count
            }
          }
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: 'Cannot retrieve the study statistics. ' + err.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>
