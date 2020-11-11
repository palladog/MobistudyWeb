<template>
  <!-- <q-page class="q-pa-lg"> -->
  <q-card>
    <q-card-section>
      <div class="text-h5">Send email from server</div> </q-card-section>
    <q-card-section>
      <div class="row q-ma-sm">
        <div class="col-2 text-bold">Email address: </div>
        <div class="col">
          <q-input type="email" v-model="emailAddress" :error="$v.emailAddress.$error" error-message="An valid email address is required" @blur="$v.emailAddress.$touch"/>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col-2 text-bold">Subject: </div>
        <div class="col">
          <q-input type="text" v-model="emailSubject" :error="$v.emailSubject.$error" error-message="An subject is required" @blur="$v.emailSubject.$touch"/>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col-2 text-bold"> Content: </div>
        <div class="col">
          <q-input type="textarea" rows="3" v-model="emailContent" :error="$v.emailContent.$error" error-message="Some content is required" @blur="$v.emailContent.$touch"/>
        </div>
      </div>
    </q-card-section>
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
