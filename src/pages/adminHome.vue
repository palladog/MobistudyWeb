<template>
  <q-page>
    <q-tabs>
      <q-tab default slot="title" name="tab-logs" icon="format_align_justify" label="Logs" />
      <q-tab slot="title" name="tab-teams" icon="group" label="Teams" />
      <q-tab slot="title" name="tab-studies" icon="local_library" label="Studies" />
      <q-tab slot="title" name="tab-users" icon="person" label="Users" />
      <q-tab slot="title" name="tab-tester" icon="verified_user" label="Tests"/>

      <q-tab-pane name="tab-logs">
        <table-audit-log/>
      </q-tab-pane>

      <q-tab-pane name="tab-teams">
        <card-new-team @newTeam="refreshTeams()"/>
        <card-teams-invitations ref="invitations" @teamDeleted="refreshStudies()"/>
      </q-tab-pane>

      <q-tab-pane name="tab-studies">
        <card-studies ref="studies"/>
      </q-tab-pane>

      <q-tab-pane name="tab-users">
          <card-users />
      </q-tab-pane>

      <q-tab-pane name="tab-tester">
        <h3>Testing tools</h3>
        <card-email-tester/>
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
  methods: {
    async refreshTeams () {
      this.$refs.invitations.getTeams()
    },
    async refreshStudies () {
      console.log(this.$refs)
      this.$refs.studies.geStudies()
    }
  }
}
</script>
