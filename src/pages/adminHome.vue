<template>
  <q-page>
    <q-tabs>
      <q-tab default slot="title" name="logs" icon="format_align_justify" label="Logs" />
      <q-tab slot="title" name="tab-teams" icon="group" label="Teams" />
      <q-tab slot="title" name="tab-studies" icon="local_library" label="Studies" />
      <q-tab slot="title" name="tab-users" icon="person" label="Users" />
      <q-tab slot="title" name="tab-participants" icon="face" label="Participants" />
      <!-- Tab Logs -->
      <q-tab-pane name="logs">
        <table-audit-log/>
      </q-tab-pane>

      <!-- Tab Teams -->
      <q-tab-pane name="tab-teams">
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
                <q-btn label="Add Team" color="warning" @click="createTeamMsg()"/>
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
                  <div class="col-2"></div>
                  <div class="col-10">
                    <q-btn class="float-right" :label="teamLabel + team.name" color="negative" icon="remove" @click="deleteTeam(index)"/>
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
                    <q-field label="Team Key: " />
                  </div>
                  <div class="col-9 exactFit">
                    {{team._key}}
                  </div>
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
                  <q-btn :label="generateLabel + team.name" color="warning" @click="generateCode(team._key)"/>
                </div>
                <q-card-separator v-if="index != allTeams.length-1" class="q-mt-md"/>
              </div>
            </q-card-main>
          </q-collapsible>
        </q-card>
        <!-- Teams and their Researchers -->
        <q-card class="q-ma-lg" v-show="allTeams.length != 0">
          <q-collapsible label="Teams &amp; Researchers:">
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
                      <q-btn class="q-mb-sm" icon="remove" round size="xs" color="negative" @click="removeTeamUser(tindex, uindex)"/>
                    </div>
                    <div class="col-3">
                      <q-field class="text-weight-bold" label="Researcher: " />
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
                    <q-field :label="study.generalities.title"/>
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
      <!-- Tab Users -->
      <q-tab-pane name="tab-users">
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
      </q-tab-pane>
      <!-- Tab Participants -->
      <q-tab-pane name="tab-participants">
        <!-- Participants and Studies -->
        <q-card class="q-ma-lg" v-show="allParticipants.length != 0">
          <q-collapsible label="Participants &amp; Studies: ">
            <q-card-separator/>
            <q-card-main>
              <div v-for="(participant, parIndex) in allParticipants" :key="parIndex">
                <div class="row">
                  <div class="col-1"></div>
                  <div class="col-3">
                    <q-field class="text-weight-bolder" label="Participant Key: " />
                  </div>
                  <div class="col-8 exactFit">
                    <q-field class="text-weight-bolder" :label="participant._key"/>
                  </div>
                </div>
                <div v-for="(study, accIndex) in participant.studies" :key="accIndex">
                  <div class="row">
                    <div class="col-1">
                      <q-btn class="q-mb-sm" icon="remove" round size="xs" color="negative" @click="removeParticipant(parIndex, accIndex)"/>
                    </div>
                    <div class="col-3">
                      <q-field class="text-weight-bolder" label="Accepted Study: " />
                    </div>
                    <div class="col-8 exactFit">
                      <q-field :label="study.studyKey"/>
                    </div>
                  </div>
                </div>
                <q-card-separator v-if="parIndex != participant.length-1" class="q-mt-sm q-mb-sm"/>
              </div>
            </q-card-main>
          </q-collapsible>
        </q-card>
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

export default {
  name: 'AdminHomePage',
  components: {
    TableAuditLog
  },
  data () {
    return {
      codeExpired: [],
      teamName: '',
      allTeams: [],
      teamMembers: [],
      teamLabel: 'Delete team: ',
      generateLabel: 'Generate New Code for ',
      allStudies: [],
      allUsers: [],
      allParticipants: []
    }
  },
  async created () {
    this.getTeams()
    this.getAllStudies()
    this.getAllUsers()
    this.getAllParticipants()
  },
  methods: {
    niceDate (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
    },
    async getTeams () {
      try {
        this.allTeams = await API.getTeams()
        for (let i = 0; i < this.allTeams.length; i++) {
          this.teamMembers[i] = this.allTeams[i].researchersKeys
          let invitationExpiry = this.allTeams[i].invitationExpiry
          // See if invitation date has expired
          if (Date.now() > new Date(invitationExpiry)) {
            this.codeExpired.push(true)
          } else {
            this.codeExpired.push(false)
          }
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
          message: 'Cannot retrieve users list',
          icon: 'report_problem'
        })
      }
    },
    async getAllParticipants () {
      try {
        this.allParticipants = await API.getParticipants()
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve participants list',
          icon: 'report_problem'
        })
      }
    },
    // Teams
    async createTeamMsg () {
      if (this.teamName === '') {
        this.$q.notify({
          color: 'negative',
          message: 'The team name is missing. Please add it in to order to create a Team.',
          icon: 'report_problem'
        })
      } else {
        try {
          await this.$q.dialog({
            title: 'Create Team',
            color: 'warning',
            message: 'You are creating a new TEAM named ' + this.teamName + '. Would you like to continue?',
            ok: 'Yes, create Team ' + this.teamName,
            cancel: 'Cancel'
          })
          this.createTeam()
        } catch (err) {
          this.$q.notify('Cancelling Creation of New Team ' + this.teamName)
        }
      }
    },
    async createTeam () {
      try {
        await API.createTeam(this.teamName)
        this.$q.notify({
          color: 'positive',
          message: 'Team ' + this.teamName + ' created!',
          icon: 'thumb_up'
        })
        this.teamName = ''
        this.getTeams()
      } catch (err) {
        if (err.response && err.response.status === 409) {
          this.$q.notify({
            color: 'negative',
            message: 'A team with the same name: ' + this.teamName + ' already exists.',
            icon: 'report_problem'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot create team ' + this.teamName,
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
    async deleteTeam (index) {
      try {
        await this.$q.dialog({
          title: 'Delete Team',
          color: 'warning',
          message: 'You are deleting TEAM ' + this.allTeams[index].name + ' from the DB. This will also delete any associated studies and the corresponding data. This cannot be undone. Would you like to continue?',
          ok: 'Yes, delete Team: ' + this.allTeams[index].name,
          cancel: 'Cancel'
        })
        this.deleteTeamFromDb(index)
      } catch (err) {
        this.$q.notify('Cancelling Deletion of Team ' + this.allTeams[index].name)
      }
    },
    async deleteTeamFromDb (index) {
      let teamName = this.allTeams[index].name
      try {
        await API.deleteTeam(this.allTeams[index]._key)
        this.allTeams.splice(index, 1)
        this.$q.notify('Team ' + teamName + ' Deleted')
        this.getTeams()
        this.getAllStudies()
        this.getAllParticipants()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot delete team ' + teamName,
          icon: 'report_problem'
        })
      }
    },
    // Remove USER from Db
    async removeTeamUser (tindex, uindex) {
      try {
        await this.$q.dialog({
          title: 'Remove User',
          color: 'warning',
          message: 'You are removing USER ' + this.allTeams[tindex].researchersKeys[uindex] + ' from TEAM ' + this.allTeams[tindex].name + '. Would you like to continue?',
          ok: 'Yes, remove User: ' + this.allTeams[tindex].researchersKeys[uindex],
          cancel: 'Cancel'
        })
        this.removeUserFromTeamDb(tindex, uindex)
      } catch (error) {
        this.$q.notify('Cancelling Removing User ' + this.allTeams[tindex].researchersKeys[uindex])
      }
    },
    async removeUserFromTeamDb (tindex, uindex) {
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
    },
    // Delete Users from Db
    async deleteUser (index) {
      let user = this.allUsers[index]
      try {
        await this.$q.dialog({
          title: 'Delete User',
          color: 'warning',
          message: 'You are deleting ' + user.role + ' ' + user.email + ' from the DB. This cannot be undone. Would you like to continue?',
          ok: 'Yes, delete User: ' + user.email,
          cancel: 'Cancel'
        })
        this.deleteUserFromDb(user, index)
      } catch (error) {
        this.$q.notify('Cancelling Deletion of User ' + user.email)
      }
    },
    async deleteUserFromDb (user, index) {
      try {
        if (user.role === 'participant') {
          // Get participant Key
          let partKey = await API.getOneParticipant(user._key)
          await API.deleteParticipant(partKey._key)
        } else {
          await API.deleteUser(user._key)
        }
        this.allUsers.splice(index, 1)
        this.$q.notify('User ' + user.email + ' Deleted')
        this.getAllUsers()
        this.getTeams()
        this.getAllParticipants()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot delete user ' + user.email,
          icon: 'report_problem'
        })
      }
    },
    // Remove Participant from DB
    async removeParticipant (parIndex, accIndex) {
      let participant = this.allParticipants[parIndex]
      try {
        await this.$q.dialog({
          title: 'Remove Participant',
          color: 'warning',
          message: 'You are removing PARTICIPANT ' + participant._key + ' from STUDY ' + participant.studies[accIndex].studyKey + ' Would you like to continue?',
          ok: 'Yes, remove Participant: ' + participant._key,
          cancel: 'Cancel'
        })
        this.removeParticipantFromStudy(participant, accIndex)
      } catch (error) {
        this.$q.notify('Cancelling Removing Participant ' + participant._key)
      }
    },
    async removeParticipantFromStudy (participant, accIndex) {
      let removedOne = {
        partKey: participant._key,
        studyKey: participant.studies[accIndex].studyKey
      }
      try {
        await API.removeParticipantFromStudy(removedOne)
        participant.studies.splice(accIndex, 1)
        this.$q.notify('Participant ' + removedOne.partKey + ' has been removed from Study ' + removedOne.studyKey)
        this.getAllParticipants()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot remove Participant ' + removedOne.partKey + ' from Study ' + removedOne.studyKey,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
