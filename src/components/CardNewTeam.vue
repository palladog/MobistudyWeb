
<template>
  <!-- Create New Teams -->
  <q-card>
    <q-card-title>
      Create new team
    </q-card-title>
    <q-card-main>
      <q-field label="Team name" :error="$v.teamName.$error" error-label="A name is required.">
        <q-input type="text" v-model="teamName" @blur="$v.teamName.$touch"/>
      </q-field>
    </q-card-main>
    <q-card-actions>
      <q-btn label="Create" color="primary" @click="createTeam"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import API from '../data/API'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CardNewTeam',
  data () {
    return {
      teamName: ''
    }
  },
  validations: {
    teamName: { required }
  },
  methods: {
    async createTeam () {
      this.$v.teamName.$touch()
      if (this.$v.teamName.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          await this.$q.dialog({
            title: 'Create Team',
            color: 'warning',
            message: 'You are creating a new team named "' + this.teamName + '". Would you like to continue?',
            ok: 'Yes, create new team',
            cancel: 'Cancel'
          })

          try {
            await API.createTeam(this.teamName)
            this.$q.notify({
              color: 'positive',
              message: 'Team ' + this.teamName + ' created!',
              icon: 'thumb_up'
            })
            this.teamName = ''
            this.$emit('newTeam', this.teamName)
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
        } catch (err) {
          this.$q.notify('Cancelling Creation of New Team')
        }
      }
    }
  }
}
</script>
