<template>
  <q-page>
    <q-card class="q-ma-lg">
      <q-card-main>
        <div class="row justify-around">
          <p class="col-2 self-center">
            Add me to a new team:
          </p>
          <q-input v-model="invitationCode" class="col-8 self-center" float-label="Invitation code" type="text" />
          <div class="col-2 self-center">
            <q-btn  label="Add" color="warning" @click="addToTeam()"/>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg q-pa-lg">
      <q-card-title>Teams
        <span slot="subtitle">A member of the following team(s) (Please select from the List): </span>
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-btn-dropdown color="primary" label="List of Teams">
          <q-list link>
            <q-item v-for="(team, index) in teamsList" :key="index" v-close-overlay @click.native="getUserStudies(index)">
              <q-item-side icon="folder" inverted color="primary" />
              <q-item-main>
                <q-item-tile label> {{ team.toUpperCase() }} </q-item-tile>
              </q-item-main>
            </q-item>
            <q-item-separator inset />
          </q-list>
      </q-btn-dropdown>
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg q-pa-lg">
        <q-card-title>Studies
            <span slot="subtitle">List of Studies for {{ this.selectedTeam }}</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div class="shadow-1 q-pa-sm q-mt-lg">
               <q-field class ="q-mt-md" label="Editable studies (NOT published): " />
                <div v-for="(study, index) in studiesList" :key="index">
                    <q-btn class ="row q-mt-md" size="lg" :label="study" color="light" @click="editStudy(index)"/>
                </div>
            </div>
            <div class="shadow-1 q-pa-sm q-mt-lg">
                <q-field class ="q-mt-md" label="Published Studies (view-only): " />
                <div v-for="(pstudy, index1) in publishedStudiesList" :key="index1">
                    <q-btn class ="row q-mt-md" size="lg" :label="pstudy" color="positive" @click="viewStudy(index1)"/>
                </div>
            </div>
            <div class ="row q-mt-lg">
                <q-btn label="Create New Study" color="secondary" @click="createNewStudy()"/>
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
      invitationCode: '',
      password: '',
      studiesList: ['a study'],
      publishedStudiesList: ['a publ'],
      teamsList: ['team A', 'Team B', 'Team C'],
      selectedTeam: ''
    }
  },
  async created () {
    let teams = await API.getUserTeams()
    console.log(teams)
  },
  methods: {
    async addToTeam () {
      try {
        await API.addUserToTeam(this.invitationCode)
        this.$q.dialog({
          title: 'User added to team',
          message: 'You have been added to the team.',
          ok: true,
          cancel: false,
          preventClose: true
        })
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot add your account to any team. Please check the invitation code again or ask for a new one.',
          icon: 'report_problem'
        })
      }
    },
    async verifyExistence () {
      // TO DO
      // Called by addToTeam() ---> verify if the user already exists in the team
    },
    getUserStudies (index) {
      this.selectedTeam = this.teamsList[index].toUpperCase()
      this.$q.notify('Get studies for user in: ' + this.selectedTeam)
    }
  }
}
</script>
