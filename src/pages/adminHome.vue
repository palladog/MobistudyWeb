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
      <q-card-main>
        <div v-for="(team, index) in allTeams" :key="index" class="q-mt-md">
          <div class="row">
            <div class="col-2">
              <q-field label="Team Name: " />
            </div>
            <div class="col-4"> {{team.name}} </div>
            <div class="col-6">
              <q-btn label="Generate new code" color="warning" @click="generateCode(team._key)"/>
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col-2">
               <q-field label="Code: " />
            </div>
            <div class="col-10 exactFit">
              {{team.invitationCode}}
            </div>
          </div>
          <q-card-separator class="q-mt-md"/>
        </div>
      </q-card-main>
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

export default {
  data () {
    return {
      teamName: '',
      allTeams: []
    }
  },
  async created () {
    this.getTeams()
  },
  methods: {
    async getTeams () {
      try {
        this.allTeams = await API.getTeams()
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
