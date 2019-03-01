<template>
  <q-page>
    <q-tabs>
      <q-tab default slot="title" name="tab-logs" icon="format_align_justify" label="Logs" />
      <q-tab slot="title" name="tab-teams" icon="group" label="Teams" />
      <q-tab slot="title" name="tab-studies" icon="local_library" label="Studies" />
      <q-tab slot="title" name="tab-users" icon="person" label="Users" />
      <q-tab slot="title" name="tab-tester" icon="verified_user" label="Tests"/>

      <q-tab-pane name="tab-logs">
        <table-audit-log/>
      </q-tab-pane>

      <q-tab-pane name="tab-teams">
        <card-new-team @newTeam="getTeams()"/>
        <card-teams-invitations @teamDeleted="refresh()"/>
      </q-tab-pane>
      <!-- Tab Studies -->
      <q-tab-pane name="tab-studies">
        <!-- Studies  -->
        <q-card class="q-ma-lg" v-show="allStudies.length != 0">
          <q-collapsible label="Studies &amp; Details:">
            <q-card-separator/>
            <q-card-main>
              <div v-for="(study, index) in allStudies" :key="index">
                <div class="row">
                  <div class="col-7"></div>
                  <div class="col-5">
                    <q-btn class="float-right" label="Delete Study from Db" color="negative" icon="remove" @click="deleteStudy(index)"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <q-field class="text-weight-bolder" label="Study Key: " />
                  </div>
                  <div class="col-9 exactFit">
                    <q-field class="text-weight-bolder" :label="study._key"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <q-field class="text-weight-bolder" label="Title: " />
                  </div>
                  <div class="col-9 exactFit">
                    <q-field :label="study.title"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <q-field class="text-weight-bolder" label="TeamKey: " />
                  </div>
                  <div class="col-9 exactFit">
                    <q-field :label="study.teamKey"/>
                  </div>
                </div>
                <q-card-separator v-if="index != allStudies.length-1" class="q-mt-sm q-mb-sm"/>
              </div>
            </q-card-main>
          </q-collapsible>
        </q-card>
      </q-tab-pane>
      <q-tab-pane name="tab-users">
          <card-users :users="allUsers" @userDeleted="getAllUsers()"/>
      </q-tab-pane>

      <q-tab-pane name="tab-tester">
        <h3>Testing tools</h3>
        <card-email-tester/>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>
<style>
div .exactFit {
  word-wrap: break-word
}
</style>

<script>
import API from '../data/API.js'
import { date } from 'quasar'
import TableAuditLog from '../components/TableAuditLog'
import CardNewTeam from '../components/CardNewTeam'
import CardTeamsInvitations from '../components/CardTeamsInvitations'
import CardUsers from '../components/CardUsers'
import CardEmailTester from '../components/CardEmailTester'

export default {
  name: 'AdminHomePage',
  components: {
    TableAuditLog,
    CardNewTeam,
    CardTeamsInvitations,
    CardUsers,
    CardEmailTester
  },
  data () {
    return {
      teamMembers: [],
      allStudies: [],
      allUsers: []
    }
  },
  async created () {
    this.refresh()
  },
  methods: {
    niceDate (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
    },
    async refresh () {
      this.getAllStudies()
      this.getAllUsers()
    },
    async getAllStudies () {
      try {
        this.allStudies = await API.getStudies()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve studies list',
          icon: 'report_problem'
        })
      }
    },
    async getAllUsers () {
      try {
        this.allUsers = await API.getAllDbUsers()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve users list',
          icon: 'report_problem'
        })
      }
    },
    // Delete STUDY from Db
    async deleteStudy (index) {
      let study = this.allStudies[index].generalities
      try {
        await this.$q.dialog({
          title: 'Deleting Study',
          color: 'warning',
          message: 'You are deleting STUDY ' + study.title + ' from the DB. This will affect participants of that study ' +
          ' and they will no longer be associated to that study.This cannot be undone. Would you like to continue?',
          ok: 'Yes, delete Study: ' + study.title,
          cancel: 'Cancel'
        })
        this.deleteStudyFromDb(index)
      } catch (error) {
        this.$q.notify('Cancelling Deletion of Study ' + study.title)
      }
    },
    async deleteStudyFromDb (index) {
      let study = this.allStudies[index]
      try {
        await API.deleteStudy(study._key)
        this.allUsers.splice(index, 1)
        this.$q.notify('Study ' + study.generalities.title + ' Deleted')
        this.getAllStudies()
        this.getAllParticipants()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot delete study ' + study.generalities.title,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
