<template>
  <q-card>
    <q-card-title>
      Teams &amp; Invitation Codes
    </q-card-title>
    <q-card-main>
      <div v-for="(team, index) in teams" :key="index" class="q-mt-sm">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-10">
            <q-btn class="float-right" label="Delete team" color="negative" icon="remove" @click="deleteTeam(index)"/>
          </div>
        </div>
        <q-field label="Team Name: ">
          <div class="col-9 exactFit"> {{team.name}} </div>
        </q-field>
        <q-field label="Team Key: ">
          <div class="col-9 exactFit">
            {{team._key}}
          </div>
        </q-field>
        <q-field label="Code: " :error="codeExpired[index]" error-label="This invitation code has EXPIRED.">
          <q-input type="textarea" :value="team.invitationCode" ref="invCode" readonly/>
        </q-field>
        <q-field label="Expiry date: ">
          <div class="col-9 exactFit">
            {{ niceDate(team.invitationExpiry) }}
          </div>
        </q-field>
        <div class="row q-mt-sm justify-between">
          <q-btn label="Generate new invitation code" color="warning" @click="generateCode(team._key)"/>
          <q-btn color="primary" round sm icon="file_copy" @click="copyCode(index)"/>
        </div>
        <q-card-separator v-if="index != teams.length-1" class="q-mt-md"/>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import API from '../data/API'
import { date } from 'quasar'

export default {
  name: 'CardTeamsInvitations',
  props: [ 'teams' ],
  computed: {
    codeExpired () {
      let expired = []
      for (let i = 0; i < this.teams.length; i++) {
        let invitationExpiry = this.teams[i].invitationExpiry
        // See if invitation date has expired
        if (Date.now() > new Date(invitationExpiry)) {
          expired.push(true)
        } else {
          expired.push(false)
        }
      }
      return expired
    }
  },
  methods: {
    niceDate (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
    },
    async generateCode (key) {
      try {
        await API.generateTeamCode(key)
        this.$emit('codeGenerated', key)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot generate invitation code',
          icon: 'report_problem'
        })
      }
    },
    copyCode (index) {
      try {
        this.$refs.invCode[index].select()
        document.execCommand('copy')
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: 'Invitation code copied to clipboard'
        })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot copy invitation code',
          icon: 'report_problem'
        })
      }
    },
    // Delete TEAM from Db
    async deleteTeam (index) {
      console.log('deleting ', index)
      try {
        await this.$q.dialog({
          title: 'Delete Team',
          color: 'warning',
          message: 'You are deleting team ' + this.teams[index].name + ' from the system. This will also delete all associated studies and corresponding data. This cannot be undone. Would you like to continue?',
          ok: 'Yes, delete Team: ' + this.teams[index].name,
          cancel: 'Cancel'
        })
        let teamName = this.teams[index].name
        try {
          await API.deleteTeam(this.teams[index]._key)
          this.teams.splice(index, 1)
          this.$q.notify('Team ' + teamName + ' Deleted')
          this.$emit('teamDeleted', this.teams[index]._key)
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete team ' + teamName,
            icon: 'report_problem'
          })
        }
      } catch (n) {
        // nothing to do here
        console.log(n)
      }
    }
  }
}
</script>
