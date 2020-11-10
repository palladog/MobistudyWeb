
<template>
  <!-- Create New Teams -->
  <q-card>
    <q-card-section> <div class="text-h6"> Create new team </div> </q-card-section>
    <q-form @submit="createTeam">
    <q-card-section>
      <div class="row q-ma-sm">
        <div class="col-2 text-bold">Team name: </div>
        <div class="col">
          <q-input type="text" v-model="teamName" @blur="$v.teamName.$touch" :error="$v.teamName.$error" error-message="A name is required"/>
        </div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn label="Create" color="primary" type="submit"/>
    </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import API from '../modules/API'
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
        this.$q.notify('Please correct the indicated fields')
      } else {
        this.$q.dialog({
          title: 'Create Team',
          color: 'warning',
          message: 'You are creating a new team named "' + this.teamName + '". Would you like to continue?',
          ok: 'Yes, create new team',
          cancel: 'Cancel'
        }).onOk(async () => {
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
        })
      }
    }
  }
}
</script>
