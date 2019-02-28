<template>
    <q-page class="q-pa-lg">
      <h3>Testing tools</h3>
      <q-card>
        <q-card-title>Send email from server</q-card-title>
        <q-card-main>
          <q-field label="Email address" >
            <q-input type="text" v-model="emailAddress"/>
          </q-field>
          <q-field label="Content" >
            <q-input type="text" v-model="emailContent"/>
          </q-field>
        </q-card-main>
        <q-card-actions>
          <q-btn label="Send" color="primary" @click="sendEmail"/>
        </q-card-actions>
      </q-card>
    </q-page>
</template>

<script>
import API from '../data/API'

export default {
  data () {
    return {
      emailAddress: '',
      emailContent: ''
    }
  },
  methods: {
    async sendEmail () {
      try {
        await API.sendTestEmail(this.emailAddress, this.emailContent)
        this.$q.notify({
          color: 'positive',
          message: 'Email sent'
        })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send email: ' + error.message,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
