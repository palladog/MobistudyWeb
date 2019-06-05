<template>
  <q-card>
    <q-card-section> <div class="text-h6"> Users </div> </q-card-section>
    <q-card-section>
      <div v-for="(user, index) in users" :key="index">
        <div class="row">
          <div class="col-7"></div>
          <div class="col-5">
            <q-btn class="float-right" label="Delete" color="negative" icon="remove" @click="deleteUser(index)"/>
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> User Key: </div>
          <div class="col"> {{user._key}} </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Role: </div>
          <div class="col"> {{user.role}} </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Name: </div>
          <div class="col"> {{user.email}} </div>
        </div>
        <q-separator v-if="index != users.length-1" class="q-mt-sm q-mb-sm"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import API from '../modules/API'

export default {
  name: 'CardUsers',
  data () {
    return {
      users: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      try {
        this.users = await API.getAllDbUsers()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve users list',
          icon: 'report_problem'
        })
      }
    },
    // Delete Users from Db
    async deleteUser (index) {
      let user = this.users[index]
      this.$q.dialog({
        title: 'Delete User',
        color: 'warning',
        message: 'You are deleting ' + user.role + ' ' + user.email + ' from the DB. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete User: ' + user.email,
        cancel: 'Cancel'
      }).onOk(async () => {
        try {
          if (user.role === 'participant') {
            // Get participant Key
            let partKey = await API.getOneParticipant(user._key)
            await API.deleteParticipant(partKey._key)
          } else {
            await API.deleteUser(user._key)
          }
          this.users.splice(index, 1)
          this.$q.notify('User ' + user.email + ' Deleted')
          this.getUsers()
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete user ' + user.email,
            icon: 'report_problem'
          })
        }
      })
    },
    // Remove researcher from a team
    // TODO: when the user is a researcher list the studies he's in and add a button to remove him from study
    async removeUserFromTeam (tindex, uindex) {
      try {
        await this.$q.dialog({
          title: 'Remove User',
          color: 'warning',
          message: 'You are removing USER ' + this.allTeams[tindex].researchersKeys[uindex] + ' from TEAM ' + this.allTeams[tindex].name + '. Would you like to continue?',
          ok: 'Yes, remove User: ' + this.allTeams[tindex].researchersKeys[uindex],
          cancel: 'Cancel'
        })
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
      } catch (error) {
        this.$q.notify('Cancelling Removing User ' + this.allTeams[tindex].researchersKeys[uindex])
      }
    }
  }
}
</script>
