<template>
  <q-page>
    <q-card class="q-ma-lg">
      <q-card-main>
        <div class="row justify-around">
          <p class="col-2 self-center">
            Create new team
          </p>
          <q-input v-model="teamName" class="col-8 self-center" float-label="Team name" type="text" />
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
        <div v-for="(team, index) in allTeams" :key="index" class="q-mt-md row justify-around">
          <p class="col-2 self-center">
            Team name: {{team.name}}
          </p>
          <div class="col-2 self-center">
            <q-btn label="Generate new code" color="warning" @click="generateCode(team._key)"/>
          </div>
          <p class="col-8">
            Code: {{team.invitationCode}}
          </p>
        </div>
      </q-card-main>
    </q-card>

  </q-page>
</template>

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
