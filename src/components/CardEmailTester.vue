<template>
  <!-- <q-page class="q-pa-lg"> -->
  <q-card>
    <q-card-title>Send email from server</q-card-title>
    <q-card-main>
      <q-field label="Email address" :error="$v.emailAddress.$error" error-label="An email address is required.">
        <q-input type="email" v-model="emailAddress" @blur="$v.emailAddress.$touch"/>
      </q-field>
      <q-field label="Subject" :error="$v.emailSubject.$error" error-label="A subject is required.">
        <q-input type="text" v-model="emailSubject" @blur="$v.emailSubject.$touch"/>
      </q-field>
      <q-field label="Content" :error="$v.emailContent.$error" error-label="Some content is required">
        <q-input type="textarea" rows="3" v-model="emailContent" @blur="$v.emailContent.$touch"/>
      </q-field>
    </q-card-main>
    <q-card-actions>
      <q-btn label="Send" color="primary" @click="sendEmail"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import API from '../modules/API'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'CardEmailTester',
  data () {
    return {
      emailAddress: '',
      emailSubject: '',
      emailContent: ''
    }
  },
  validations: {
    emailAddress: { required, email },
    emailSubject: { required },
    emailContent: { required }
  },
  methods: {
    async sendEmail () {
      this.$v.emailAddress.$touch()
      this.$v.emailContent.$touch()
      this.$v.emailSubject.$touch()
      if (this.$v.emailAddress.$error || this.$v.emailSubject.$error || this.$v.emailContent.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          await API.sendTestEmail(this.emailAddress, this.emailSubject, this.emailContent)
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
}
</script>
