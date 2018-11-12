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
        <q-card-title>Studies
            <span slot="subtitle">List of Studies</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div class="shadow-1 q-pa-sm q-mt-lg">
               <q-field class ="q-mt-md" label="Editable studies (NOT published): " />
                <div v-for="(study, index) in studiesList" :key="index">
                    <q-btn class ="row q-mt-md" size="lg" :label="study" @click="editStudy(index)"/>
                </div>
            </div>
            <div class="shadow-1 q-pa-sm q-mt-lg">
                <q-field class ="q-mt-md" label="Publised Studies (view-only): " />
                <div v-for="(pstudy, index1) in publishedStudiesList" :key="index1">
                    <q-btn class ="row q-mt-md" size="lg" :label="pstudy" @click="viewStudy(index1)"/>
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
      password: ''
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
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot add your account to any team, please check the invitation code again',
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
