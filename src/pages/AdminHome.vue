<template>
  <q-page>
    <q-tabs v-model="tab" class="bg-secondary text-white shadow-2">
      <q-tab name="tab-logs" icon="format_align_justify" label="Logs" />
      <q-tab  name="tab-teams" icon="group" label="Teams" />
      <q-tab  name="tab-studies" icon="local_library" label="Studies" />
      <q-tab  name="tab-users" icon="person" label="Users" />
      <q-tab  name="tab-tester" icon="verified_user" label="Tests"/>
    </q-tabs>
    <q-tab-panels v-model="tab">
      <q-tab-panel name="tab-logs">
        <table-audit-log/>
      </q-tab-panel>

      <q-tab-panel name="tab-teams">
        <card-new-team @newTeam="refreshTeams()"/>
        <card-teams-invitations ref="invitations" @teamDeleted="refreshStudies()" class="q-mt-md"/>
      </q-tab-panel>

      <q-tab-panel name="tab-studies">
        <card-studies ref="studies"/>
      </q-tab-panel>

      <q-tab-panel name="tab-users">
        <card-users />
      </q-tab-panel>

      <q-tab-panel name="tab-tester">
        <h4>Testing tools</h4>
        <card-email-tester/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<style>
div .exactFit {
  word-wrap: break-word
}
</style>

<script>
import TableAuditLog from '../components/TableAuditLog'
import CardNewTeam from '../components/CardNewTeam'
import CardTeamsInvitations from '../components/CardTeamsInvitations'
import CardUsers from '../components/CardUsers'
import CardStudies from '../components/CardStudies'
import CardEmailTester from '../components/CardEmailTester'

export default {
  name: 'AdminHomePage',
  components: {
    TableAuditLog,
    CardNewTeam,
    CardTeamsInvitations,
    CardStudies,
    CardUsers,
    CardEmailTester
  },
  data () {
    return {
      tab: 'tab-logs'
    }
  },
  methods: {
    async refreshTeams () {
      if (this.$refs.invitations) this.$refs.invitations.getTeams()
    },
    async refreshStudies () {
      if (this.$refs.studies) this.$refs.studies.geStudies()
    }
  }
}
</script>
