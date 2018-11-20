<template>
  <q-page>
    <q-card class="q-ma-lg q-pl-lg" color="cyan-6">
      <q-card-main>
        {{ welcomeLabel }}
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg">
      <q-card-title>
        Create new team
      </q-card-title>
      <q-card-main>
        <div class="row">
          <div class="col-10 self-center">
            <q-input v-model="teamName" class="col-8 self-center" float-label="Team name" type="text" />
          </div>
          <div class="col-2 self-center">
            <q-btn label="Add" color="warning" @click="createTeam()"/>
          </div>
        </div>
      </q-card-main>
    </q-card>

    <q-card class="q-ma-lg">
      <q-card-title>
        Generate teams invitation codes
      </q-card-title>
      <q-collapsible label="Click to view teams and codes">
        <q-card-separator/>
        <q-card-main>
        <div v-for="(team, index) in allTeams" :key="index" class="q-mt-sm">
          <div class="row">
            <div class="col-3">
              <q-field label="Team Name: " />
            </div>
            <div class="col-9 exactFit"> {{team.name}} </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-3">
               <q-field label="Code: " />
            </div>
            <div class="col-9 exactFit">
              {{team.invitationCode}}
            </div>
          </div>
          <div class="row q-mt-sm">
            <div class="col-3">
               <q-field label="Expiry date: " />
            </div>
            <div class="col-9 exactFit">
              {{ niceDate(team.invitationExpiry) }}
            </div>
          </div>
          <div class="row q-mt-sm">
            <q-btn label="Generate new code" color="warning" @click="generateCode(team._key)"/>
          </div>
          <q-card-separator v-if="index != allTeams.length-1" class="q-mt-md"/>
        </div>
        </q-card-main>
      </q-collapsible>
    </q-card>

    <q-card class="q-ma-lg">
      <q-collapsible label="Teams &amp; Members:">
        <q-card-separator/>
        <q-card-main>
        <div v-for="(team, tindex) in allTeams" :key="tindex">
          <div class="row">
            <div class="col-3">
              <q-field class="text-weight-bolder" label="Team: " />
            </div>
            <div class="col-9 exactFit">
              <q-field class="text-weight-bolder" :label="team.name"/>
            </div>
          </div>
          <div v-for="(user, uindex) in teamMembers[tindex]" :key="uindex">
            <div class="row">
              <div class="col-3">
                <q-field class="text-weight-medium" label="User: " />
              </div>
              <div class="col-9 exactFit">
                <q-field :label="user"/>
              </div>
            </div>
          </div>
          <q-card-separator v-if="tindex != allTeams.length-1" class="q-mt-sm"/>
        </div>
        </q-card-main>
      </q-collapsible>
    </q-card>

    <q-card class="q-ma-lg">
      <q-collapsible label="List of Studies &amp; Details:">
        <q-card-separator/>
        <q-card-main>
        <div v-for="(study, index) in allStudies" :key="index">
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
              <q-field :label="study.generalities.title"/>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <q-field class="text-weight-bolder" label="TeamKey: " />
            </div>
            <div class="col-9 exactFit">
              <q-field :label="study.studyTeamKey"/>
            </div>
          </div>
          <q-card-separator v-if="index != allStudies.length-1" class="q-mt-sm q-mb-sm"/>
          </div>
        </q-card-main>
      </q-collapsible>
    </q-card>
  </q-page>
</template>
<style>
div .exactFit {
  word-wrap: break-word
}
</style>

<script>
import API from '../data/API.js'
import userinfo from '../data/userinfo.js'
import { date } from 'quasar'

export default {
  data () {
    return {
      teamName: '',
      allTeams: [],
      teamMembers: [],
      allStudies: []
    }
  },
  async created () {
    this.getTeams()
    this.getAllStudies()
  },
  computed: {
    welcomeLabel () {
      return 'Hello ' + userinfo.getUser().email + '. You are logged in as ' + userinfo.getUser().role + '.'
    }
  },
  methods: {
    niceDate (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
    },
    async getTeams () {
      try {
        this.allTeams = await API.getTeams()
        let i = 0
        for (i; i < this.allTeams.length; i++) {
          this.teamMembers[i] = this.allTeams[i].researchersKeys
        }
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve teams list',
          icon: 'report_problem'
        })
      }
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
    async createTeam () {
      try {
        await API.createTeam(this.teamName)
        this.teamName = ''
        this.$q.notify({
          color: 'positive',
          message: 'Team created!',
          icon: 'thumb_up'
        })
        this.getTeams()
      } catch (err) {
        if (err.response && err.response.status === 409) {
          this.$q.notify({
            color: 'negative',
            message: 'A team with the same name already exists',
            icon: 'report_problem'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot create team',
            icon: 'report_problem'
          })
        }
      }
    },
    async generateCode (key) {
      try {
        await API.generateTeamCode(key)
        this.getTeams()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot generate invitation code',
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
