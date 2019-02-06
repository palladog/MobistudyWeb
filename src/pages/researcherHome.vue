<template>
  <q-page>
    <q-card class="q-ma-lg q-pl-lg" color="cyan-6">
      <q-card-main>
        {{ welcomeLabel }}
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

    <q-card class="q-ma-lg q-pa-lg" v-show="teamsListOptions.length > 0">
        <q-card-title>Studies
            <span slot="subtitle">List of Studies for {{ this.selectedTeamLabel }}</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div class="shadow-1 q-pa-sm q-mt-lg" v-show="unpublishedStudies.length > 0">
               <q-field class ="q-mt-md" label="Editable studies (NOT published): " />
               <q-card-separator />
                <div v-for="(study, index) in unpublishedStudies" :key="index">
                  <div class="row">
                    <div class="col">
                      <q-btn class ="row q-mt-md" size="md" :label="study.title" color="positive" @click="goToStudy(index)"/>
                    </div>
                    <div class="col">
                      <q-btn class ="row q-mt-md sm" round color="negative" size="sm" icon="remove" @click="removeUnpublishedStudy(index)"/>
                    </div>
                  </div>
                </div>
            </div>
            <div class="shadow-1 q-pa-sm q-mt-lg" v-show="publishedStudies.length > 0">
                <q-field class ="q-mt-md" label="Published Studies (view-only): " />
                <q-card-separator />
                <div v-for="(pstudy, index1) in publishedStudies" :key="index1">
                    <q-btn class ="row q-mt-md" size="md" :label="pstudy.title" color="light" @click="goToPubStudy(index1)"/>
                </div>
            </div>
            <div class ="row q-mt-lg">
                <q-btn :label="createStudyLabel" color="secondary" @click="createNewStudy()"/>
            </div>
        </q-card-main>
    </q-card>

    <!-- Published Study and Accepted/Withdrawn Participants -->
    <q-card class="q-ma-lg" v-show="publishedStudies.length != 0">
      <q-collapsible label="Published Study &amp; Participants (by TEAM): ">
        <q-card-separator/>
        <q-card-main>
        <div class="shadow-1 q-pa-sm q-mt-lg" v-for="(study, index) in publishedStudies" :key="index">
          <div class="row">
            <div class="col-3">
              <q-field class="text-weight-bolder" label="Accepted Study: " />
            </div>
            <div class="col-9 exactFit">
              <q-field class="text-weight-bolder" :label="study.title"/>
            </div>
          </div>
            <div v-for="(participant, accIndex) in study.participants" :key="accIndex">
              <div class="row">
                <div class="col-3">
                  <q-field class="text-weight-bolder" label="Participant: " />
                </div>
                <div class="col-9 exactFit">
                  <q-field :label="participant"/>
                </div>
              </div>
            </div>
        </div>
        </q-card-main>
      </q-collapsible>
    </q-card>
  </q-page>
</template>

<script>
import API from '../data/API.js'
import userinfo from '../data/userinfo.js'

export default {
  data () {
    return {
      invitationCode: '',
      unpublishedStudies: [],
      publishedStudies: [],
      teamsListOptions: [],
      selectedTeamValue: '',
      selectedTeamLabel: '',
      createStudyLabel: ''
    }
  },
  async created () {
    try {
      this.initTeams()
    } catch (err) {
      this.$q.notify({
        color: 'negative',
        message: 'Cannot initialise home page. Please check our connection.',
        icon: 'report_problem'
      })
    }
  },
  computed: {
    welcomeLabel () {
      return 'Hello ' + userinfo.getUser().email + '. You are logged in as a ' + userinfo.getUser().role + '.'
    }
  },
  methods: {
    async initTeams () {
      let teams = await API.getTeams()
      this.teamsListOptions = teams.map(t => {
        return {
          label: t.name,
          value: t._key
        }
      })
      if (teams.length > 0) {
        // Set default value displayed to that of first element
        this.selectedTeamValue = teams[0]._key
        this.selectedTeamLabel = teams[0].name
        this.createStudyLabel = 'Create new study for ' + this.selectedTeamLabel
        this.getAllStudies()
      }
    },
    async addToTeam () {
      try {
        let res = await API.addUserToTeam(this.invitationCode)
        this.$q.dialog({
          title: 'User added to team',
          message: 'You have been added to the team ' + res.data.teamName + '.',
          ok: true,
          cancel: false,
          preventClose: true
        })
        this.invitationCode = ''
        this.initTeams()
      } catch (err) {
        if (err.response.status === 409) {
          this.$q.notify({
            color: 'positive',
            message: 'You are already a member of this team!'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot add your account to the team. Please check the invitation code again or ask for a new one.',
            icon: 'report_problem'
          })
        }
      }
    },
    selectTeam (index) {
      let result = this.teamsListOptions.find(opts => opts.value === this.selectedTeamValue)
      this.selectedTeamLabel = result.label
      this.getAllStudies()
      this.createStudyLabel = 'Create new study for ' + this.selectedTeamLabel
      this.unpublishedStudies = []
      this.publishedStudies = []
    },
    async getAllStudies () {
      try {
        // All Studies for a team
        let studies = await API.getAllTeamStudies(this.selectedTeamValue)
        if (studies.length > 0) {
          // Get Published Studies
          this.publishedStudies = studies.filter(function (obj) {
            return obj.publishedTS && obj.publishedTS !== ''
          }).map(function (obj) {
            let pubObj = { 'title': obj.generalities.title, 'study_key': obj._key }
            return pubObj
          })
          // if there are published studies, list the participants
          if (this.publishedStudies.length > 0) {
            for (let i = 0; i < this.publishedStudies.length; i++) {
              let parts = await API.getParticipantsOfStudy(this.publishedStudies[i].study_key)
              this.publishedStudies[i].participants = parts.map((p) => {
                return p._key
              })
            }
          }
          // Get unpublished Studies
          this.unpublishedStudies = studies.filter(function (obj) {
            return !obj.publishedTS || obj.publishedTS === ''
          }).map(function (obj) {
            let unpubObj = { 'title': obj.generalities.title, 'study_key': obj._key }
            return unpubObj
          })
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
      this.$router.push('studyDesign/' + this.selectedTeamValue + '/' + this.unpublishedStudies[index].study_key)
    },
    goToPubStudy (index) {
      this.$router.push('studyDesign/' + this.selectedTeamValue + '/' + this.publishedStudies[index].study_key)
    },
    async removeUnpublishedStudy (index) {
      let studyKey = this.unpublishedStudies[index].study_key
      // Check if the status of the study is published or not
      try {
        let study = await API.getStudy(studyKey)
        if (!study.publishedTS) {
          try {
            await this.$q.dialog({
              title: 'Remove Study',
              color: 'warning',
              message: 'You are deleting the draft Study. Would you like to continue?',
              ok: 'Yes, delete the study.',
              cancel: 'Cancel'
            })
            this.unpublishedStudies.splice(index, 1)
            // Remove from db
            await API.deleteStudy(studyKey)
          } catch (error) {
            this.$q.notify('Cancelling deletion of study.')
          }
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'This study has been published and cannot be removed.',
            icon: 'report_problem'
          })
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve study.',
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
