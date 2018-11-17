<template>
  <q-page>
    <q-card class="q-ma-lg q-pl-lg" color="cyan-2">
      <q-card-main>
        <q-field :label="userWelcome"/>
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg q-pl-lg q-pr-lg">
      <q-card-title>Add me to a new team</q-card-title>
      <q-card-main>
          <q-input v-model="invitationCode" float-label="Invitation code" type="text" clearable/>
          <q-btn class="q-mt-md"  label="Add" color="warning" @click="addToTeam()"/>
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg q-pa-lg">
      <q-card-title  v-show="teamsListOptions.length === 0">Teams
        <span slot="subtitle">You are not a member of any team. Please contact your mobiStudy admin to be added to one. </span>
      </q-card-title>
      <q-card-title  v-show="teamsListOptions.length > 0">Teams
        <span slot="subtitle">You are a member of the following team(s). (Please select one from the List to continue): </span>
      </q-card-title>
      <q-card-separator />
      <q-card-main v-show="teamsListOptions.length > 0">
        <q-select v-model="selectedTeamValue" :options="teamsListOptions" @input="selectTeam()"/>
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg q-pa-lg" v-show="userListOfStudies.length > 0">
        <q-card-title>Studies
            <span slot="subtitle">List of Studies for {{ this.selectedTeamLabel }}</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div class="shadow-1 q-pa-sm q-mt-lg" v-show="unpublishedStudiesList.length > 0">
               <q-field class ="q-mt-md" label="Editable studies (NOT published): " />
               <q-card-separator />
                <div v-for="(study, index) in unpublishedStudiesList" :key="index">
                    <q-btn class ="row q-mt-md" size="lg" :label="study.title" color="light" @click="goToStudy(index)"/>
                </div>
            </div>
            <div class="shadow-1 q-pa-sm q-mt-lg" v-show="publishedStudiesList.length > 0">
                <q-field class ="q-mt-md" label="Published Studies (view-only): " />
                <q-card-separator />
                <div v-for="(pstudy, index1) in publishedStudiesList" :key="index1">
                    <q-btn class ="row q-mt-md" size="lg" :label="pstudy.title" color="positive" @click="goToPubStudy(index1)"/>
                </div>
            </div>
            <div class ="row q-mt-lg">
                <q-btn :label="createStudyLabel" color="secondary" @click="createNewStudy()"/>
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
      userWelcome: '',
      invitationCode: '',
      userListOfStudies: [],
      unpublishedStudiesList: [],
      publishedStudiesList: [],
      teamsListOptions: [],
      selectedTeamValue: '',
      selectedTeamLabel: '',
      createStudyLabel: ''
    }
  },
  async created () {
    try {
      this.initTeams()
      this.initWelcomeLabel()
    } catch (err) {
      this.$q.notify({
        color: 'negative',
        message: 'Cannot initialise home page. Please check our connection.',
        icon: 'report_problem'
      })
    }
  },
  methods: {
    async initTeams () {
      let teams = await API.getTeams()
      if (teams.length > 0) {
        let i = 0
        for (i = 0; i < teams.length; i++) {
          // get each team name and add it to teamsListOptions
          this.teamsListOptions.push({
            label: teams[i].name,
            value: teams[i]._key
          })
        }
        // Set default value displayed to that of first element
        this.selectedTeamValue = teams[0]._key
        this.selectedTeamLabel = teams[0].name
        this.createStudyLabel = 'Create new study for ' + this.selectedTeamLabel
        this.getAllStudies()
      }
    },
    async initWelcomeLabel () {
      let cati = window.localStorage.getItem('user')
      cati = JSON.parse(cati)
      let catiKy = cati._key
      let userDetails = await API.getUserByKey(catiKy)
      this.userWelcome = 'Hello ' + userDetails.email + '. You are logged in as a ' + userDetails.role + '.'
    },
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
    selectTeam (index) {
      let result = this.teamsListOptions.find(opts => opts.value === this.selectedTeamValue)
      this.selectedTeamLabel = result.label
      this.getAllStudies()
      this.createStudyLabel = 'Create new study for ' + this.selectedTeamLabel
    },
    async getAllStudies () {
      try {
        // All Studies for a team
        this.userListOfStudies = await API.getAllTeamStudies(this.selectedTeamValue)
        if (this.userListOfStudies.length > 0) {
          // Get Published Studies
          var publishedStudies = this.userListOfStudies.filter(function (obj) {
            return obj.published !== ''
          }).map(function (obj) {
            let pubObj = { 'title': obj.generalities.title, 'study_key': obj._key }
            return pubObj
          })
          this.publishedStudiesList = publishedStudies
          // Get unpublished Studies
          var unPublishedStudies = this.userListOfStudies.filter(function (obj) {
            return obj.published === ''
          }).map(function (obj) {
            let unpubObj = { 'title': obj.generalities.title, 'study_key': obj._key }
            return unpubObj
          })
          this.unpublishedStudiesList = unPublishedStudies
        }
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot get list of studies.',
          icon: 'report_problem'
        })
      }
    },
    createNewStudy () {
      // user has to select a team
      if (this.selectedTeamValue === '') {
        this.$q.notify({
          color: 'negative',
          message: 'You must select a team in order to create a study.',
          icon: 'report_problem'
        })
      } else {
        this.$router.push('studyDesign/' + this.selectedTeamValue)
      }
    },
    goToStudy (index) {
      this.$router.push('studyDesign/' + this.selectedTeamValue + '/' + this.unpublishedStudiesList[index].study_key)
    },
    goToPubStudy (index) {
      this.$router.push('studyDesign/' + this.selectedTeamValue + '/' + this.publishedStudiesList[index].study_key)
    }
  }
}
</script>
