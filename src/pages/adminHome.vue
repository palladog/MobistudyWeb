<template>
  <q-page>
    <q-card class="q-ma-lg q-pl-lg" color="cyan-6">
      <q-card-main>
        {{ welcomeLabel }}
      </q-card-main>
    </q-card>
    <!-- Create New Teams -->
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
            <q-btn label="Add Team" color="warning" @click="createTeam()"/>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <!-- Teams and Invitation Codes -->
    <q-card class="q-ma-lg" v-show="allTeams.length != 0">
      <q-collapsible label="Teams &amp; Invitation Codes">
        <q-card-separator/>
        <q-card-main>
        <div v-for="(team, index) in allTeams" :key="index" class="q-mt-sm">
          <div class="row" v-show="codeExpired[index]">
            <p><font color="red"> The Invitation Code for {{team.name}} has EXPIRED. </font></p>
          </div>
          <div class="row">
            <div class="col-7"></div>
            <div class="col-5">
              <q-btn class="float-right" label="Delete Team" color="negative" icon="remove" @click="deleteTeam(index)"/>
            </div>
          </div>
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
    <!-- Teams and their Users -->
    <q-card class="q-ma-lg" v-show="allTeams.length != 0">
      <q-collapsible label="Teams &amp; Users:">
        <q-card-separator/>
        <q-card-main>
        <div v-for="(team, tindex) in allTeams" :key="tindex">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-3">
              <q-field class="text-weight-bolder" label="Team: " />
            </div>
            <div class="col-8 exactFit">
              <q-field class="text-weight-bolder" :label="team.name"/>
            </div>
          </div>
          <div v-for="(user, uindex) in teamMembers[tindex]" :key="uindex">
            <div class="row">
              <div class="col-1">
                <q-btn class="q-mb-sm" icon="remove" round size="xs" color="negative" @click="removeTeamUser(uindex, tindex)"/>
              </div>
              <div class="col-3">
                <q-field class="text-weight-bold" label="User: " />
              </div>
              <div class="col-8 exactFit">
                <q-field :label="user"/>
              </div>
            </div>
          </div>
          <q-card-separator v-if="tindex != allTeams.length-1" class="q-mt-sm"/>
        </div>
        </q-card-main>
      </q-collapsible>
    </q-card>
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
    <!-- List of Users  -->
    <q-card class="q-ma-lg" v-show="allUsers.length != 0">
      <q-collapsible label="All Users &amp; Details:">
        <q-card-separator/>
        <q-card-main>
        <div v-for="(user, index) in allUsers" :key="index">
          <div class="row">
            <div class="col-7"></div>
            <div class="col-5">
              <q-btn class="float-right" label="Delete User from Db" color="negative" icon="remove" @click="deleteUser(index)"/>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <q-field class="text-weight-bolder" label="User Key: " />
            </div>
            <div class="col-9 exactFit">
              <q-field class="text-weight-bolder" :label="user._key"/>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <q-field class="text-weight-bolder" label="Role: " />
            </div>
            <div class="col-9 exactFit">
              <q-field :label="user.role"/>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <q-field class="text-weight-bolder" label="Name: " />
            </div>
            <div class="col-9 exactFit">
              <q-field :label="user.email"/>
            </div>
          </div>
          <q-card-separator v-if="index != allUsers.length-1" class="q-mt-sm q-mb-sm"/>
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
      codeExpired: [],
      teamName: '',
      allTeams: [],
      teamMembers: [],
      allStudies: [],
      allUsers: []
    }
  },
  async created () {
    this.init()
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
    // Initialisation
    init () {
      this.getTeams()
      this.getAllStudies()
      this.getAllUsers()
    },
    async getTeams () {
      console.log('NICE NOW: ', this.niceDate(Date.now()))
      try {
        this.allTeams = await API.getTeams()
        let i = 0
        for (i; i < this.allTeams.length; i++) {
          this.teamMembers[i] = this.allTeams[i].researchersKeys
          let invitationExpiry = this.allTeams[i].invitationExpiry
          console.log('inv exp: ', invitationExpiry)
          console.log('NICE inv exp: ', this.niceDate(invitationExpiry))
          // See if invitation date has expired
          if (this.niceDate(Date.now()) > this.niceDate(invitationExpiry)) {
            this.codeExpired.push(true)
          } else {
            this.codeExpired.push(false)
          }
          console.log('CODE E: ', this.codeExpired[i])
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
    async getAllUsers () {
      try {
        this.allUsers = await API.getAllDbUsers()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve studies list',
          icon: 'report_problem'
        })
      }
    },
    // Teams
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
        this.codeExpired = []
        this.getTeams()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot generate invitation code',
          icon: 'report_problem'
        })
      }
    },
    // Delete TEAM from Db
    deleteTeam (index) {
      this.$q.dialog({
        title: 'Exit',
        color: 'warning',
        message: 'You are deleting TEAM ' + this.allTeams[index].name + ' from the DB. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete Team: ' + this.allTeams[index].name,
        cancel: 'Cancel'
      }).then(() => {
        this.deleteTeamFromDb(index)
      }).catch(() => {
        this.$q.notify('Cancelling Deleting Team ' + this.allTeams[index].name)
      })
    },
    async deleteTeamFromDb (index) {
      try {
        await API.deleteTeam(this.allTeams[index]._key)
        this.allTeams.splice(index, 1)
        this.$q.notify('Team ' + this.allTeams[index].name + ' Deleted')
        this.getTeams()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot delete team',
          icon: 'report_problem'
        })
      }
    },
    // Remove USER from Db
    removeTeamUser (uindex, tindex) {
      this.$q.dialog({
        title: 'Exit',
        color: 'warning',
        message: 'You are removing USER ' + this.allTeams[tindex].researchersKeys[uindex] + ' from TEAM ' + this.allTeams[tindex].name + '. Would you like to continue?',
        ok: 'Yes, remove User: ' + this.allTeams[tindex].researchersKeys[uindex],
        cancel: 'Cancel'
      }).then(() => {
        this.removeUserFromTeamDb(uindex, tindex)
      }).catch(() => {
        this.$q.notify('Cancelling Removing User' + this.allTeams[tindex].researchersKeys[uindex])
      })
    },
    async removeUserFromTeamDb (uindex, tindex) {
      let userRemoved = {
        teamKey: this.allTeams[tindex]._key,
        userKey: this.allTeams[tindex].researchersKeys[uindex]
      }
      try {
        await API.removeUserFromTeam(userRemoved)
        this.allTeams.splice(tindex, 1)
        this.$q.notify('User ' + userRemoved.userKey + ' has been removed from Team ' + userRemoved.teamKey)
        this.getTeams()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot remove User ' + userRemoved.userKey + ' from Team ' + this.allTeams[tindex].name,
          icon: 'report_problem'
        })
      }
    },
    // Delete STUDY from Db
    deleteStudy (index) {
      let study = this.allStudies[index].generalities
      this.$q.dialog({
        title: 'Exit',
        color: 'warning',
        message: 'You are deleting STUDY ' + study.title + ' from the DB. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete Study: ' + study.title,
        cancel: 'Cancel'
      }).then(() => {
        this.deleteStudyFromDb(index)
      }).catch(() => {
        this.$q.notify('Cancelling Deleting Study' + study.title)
      })
    },
    async deleteStudyFromDb (index) {
      let study = this.allStudies[index]
      try {
        await API.deleteStudy(study._key)
        this.allUsers.splice(index, 1)
        this.$q.notify('Study ' + study.generalities.title + ' Deleted')
        this.getAllStudies()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot delete study' + study.generalities.title,
          icon: 'report_problem'
        })
      }
    },
    // Delete Users from Db
    deleteUser (index) {
      this.$q.dialog({
        title: 'Exit',
        color: 'warning',
        message: 'You are deleting USER ' + this.allUsers[index].email + ' from the DB. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete User: ' + this.allUsers[index].email,
        cancel: 'Cancel'
      }).then(() => {
        this.deleteUserFromDb(index)
      }).catch(() => {
        this.$q.notify('Cancelling Deleting User' + this.allUsers[index].email)
      })
    },
    async deleteUserFromDb (index) {
      try {
        await API.deleteUser(this.allUsers[index]._key)
        this.allUsers.splice(index, 1)
        this.$q.notify('User ' + this.allUsers[index].email + ' Deleted')
        this.getAllUsers()
        this.getTeams()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot delete user' + this.allUsers[index].email,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
