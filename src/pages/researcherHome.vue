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
        <q-select v-model="selectedTeamValue" :options="teamsListOptions" @input="selectTeam()"/>
      </q-card-main>
    </q-card>
    <q-card class="q-ma-lg q-pa-lg">
        <q-card-title>Studies
            <span slot="subtitle">List of Studies for {{ this.selectedTeamLabel }}</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div class="shadow-1 q-pa-sm q-mt-lg">
               <q-field class ="q-mt-md" label="Editable studies (NOT published): " />
                <div v-for="(study, index) in unpublishedStudiesList" :key="index">
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
                <q-btn :label="createStudyLabel" color="secondary" @click="createNewStudy()"/>
            </div>
        </q-card-main>
    </q-card>
    <q-btn label="Get list of studies" @click="getAllStudies()" />

  </q-page>
</template>

<script>
import API from '../data/API.js'

export default {
  data () {
    return {
      invitationCode: '',
      password: '',
      unpublishedStudiesList: [],
      publishedStudiesList: [],
      teamsList: [],
      teamsListOptions: [],
      selectedTeamValue: '',
      selectedTeamLabel: '',
      createStudyLabel: 'Create new study'
    }
  },
  async created () {
    let teams = await API.getUserTeams()
    let i = 0
    for (i = 0; i < teams.length; i++) {
      // get each team name and add it to teamsListOptions
      this.teamsListOptions.push({
        label: teams[i].name,
        value: teams[i]._key
      })
    }
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
    selectTeam (index) {
      let result = this.teamsListOptions.find(opts => opts.value === this.selectedTeamValue)
      this.selectedTeamLabel = result.label
      this.createStudyLabel = 'Create new study for ' + this.selectedTeamLabel
    },
    async getAllStudies () {
      try {
        // All Studies for a team
        let listOfStudies = await API.getAllTeamStudies(this.selectedTeamValue)
        if (listOfStudies.length > 0) {
          // Get Published Studies
          var publishedStudies = listOfStudies.filter(function (obj) {
            return obj.published !== ''
          }).map(function (obj) {
            return obj.generalities.title
          })
          this.publishedStudiesList = publishedStudies
          // Get unpublished Studies
          var unPublishedStudies = listOfStudies.filter(function (obj) {
            return obj.published === ''
          }).map(function (obj) {
            return obj.generalities.title
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
    }
  }
}
</script>
