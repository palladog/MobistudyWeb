<template>
  <q-page>

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
        <q-card-main>
        <div v-for="(team, index) in allTeams" :key="index" class="q-mt-md">
          <div class="row">
            <div class="col">
              <q-field label="Team Name: " />
            </div>
            <div class="col"> {{team.name}} </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col-2">
               <q-field label="Code: " />
            </div>
            <div class="col-10 exactFit">
              {{team.invitationCode}}
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col">
               <q-field label="Expiry date: " /> {{ niceDate(team.invitationExpiry) }}
            </div>
            <div class="col">
              <q-btn label="Generate new code" color="warning" @click="generateCode(team._key)"/>
            </div>
          </div>
          <q-card-separator class="q-mt-md"/>
        </div>
        </q-card-main>
      </q-collapsible>
    </q-card>

    <q-card class="q-ma-lg">
      <q-collapsible label="Teams &amp; Members:">
        <q-card-main>
        <div v-for="(team, tindex) in allTeams" :key="tindex">
          <div class="row">
            <div class="col-2">
              <q-field class="text-weight-bolder" label="Team: " />
            </div>
            <div class="col-10 exactFit">
              <q-field class="text-weight-bolder" :label="team.name"/>
            </div>
          </div>
          <div v-for="(user, uindex) in teamMembers[tindex]" :key="uindex">
            <div class="row">
              <div class="col-2">
                <q-field class="text-weight-medium" label="User: " />
              </div>
              <div class="col-10 exactFit">
                <q-field :label="user"/>
              </div>
            </div>
          </div>
          <q-card-separator class="q-mt-sm"/>
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
import { date } from 'quasar'

export default {
  data () {
    return {
      teamName: '',
      allTeams: [],
      teamMembers: []
    }
  },
  async created () {
    this.getTeams()
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
