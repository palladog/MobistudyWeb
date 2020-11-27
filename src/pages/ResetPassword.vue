<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-sm loginBox">
          <q-card-title v-show="!email">Reset your password</q-card-title>
          <q-card-title v-show="email">Reset password for {{ email }}</q-card-title>
          <q-card-main>
            <q-field label="Token" helper="As received on your email." :error="$v.token.$error" error-message="A token is required." >
              <q-input v-model.trim="$v.token.$model" type="text" @blur.native="$v.token.$touch"/>
            </q-field>
            <q-field class="q-mt-md" label="Password" helper="Enter a new password." :error="$v.newPassword.$error" :error-message="getFirstPwdCheckError(newPassword)">
              <q-input v-model.trim="$v.newPassword.$model" type="password" @blur.native="$v.newPassword.$touch"/>
            </q-field>
            <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." :error="$v.newPassword2.$error" error-message="Passwords must match">
              <q-input v-model.trim="$v.newPassword2.$model" type="password" @blur.native="$v.newPassword2.$touch"/>
            </q-field>
          </q-card-main>
          <q-card-actions>
            <q-btn label="Cancel" color="secondary" @click="$router.push('login')"/>
            <q-btn label="Reset" color="primary" @click="resetUserPassword"/>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import PWDchecker from 'zxcvbn'
import owasp from 'owasp-password-strength-test'
import API from '../modules/API.js'
import { required, sameAs } from 'vuelidate/lib/validators'

owasp.config({
  allowPassphrases: true,
  maxLength: 70,
  minLength: 8,
  minPhraseLength: 10,
  minOptionalTestsToPass: 3
})

function checkPwdStrength (pwd) {
  if (this.email) {
    // check if password includes name in email
    let i = this.email.indexOf('@')
    if (i > 0) {
      let userName = this.email.substring(0, i)
      if (pwd.toUpperCase().includes(userName.toUpperCase())) {
        return false
      }
    }
  }
  if (owasp.test(pwd).strong) {
    let strength = PWDchecker(pwd)
    return strength.score >= 2
  } else return false
}

export default {
  name: 'ResetPasswordPage',
  data () {
    return {
      email: undefined,
      token: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  validations: {
    token: { required },
    newPassword: { required, checkPwdStrength },
    newPassword2: { sameAsPassword: sameAs('pw1') }
  },
  created () {
    if (this.$route.query.email) this.email = this.$route.query.email
    if (this.$route.query.token) this.token = this.$route.query.token
  },
  methods: {
    getFirstPwdCheckError (pwd) {
      if (this.email) {
        // check if password includes name in email
        let i = this.email.indexOf('@')
        if (i > 0) {
          let userName = this.email.substring(0, i)
          if (pwd.toUpperCase().includes(userName.toUpperCase())) {
            return 'Password cannot contain email'
          }
        }
      }
      let result = owasp.test(pwd)
      if (!result.strong) {
        return result.errors[0]
      } else {
        result = PWDchecker(pwd)
        if (result.feedback) {
          let mesg = 'The password is too simple'
          if (result.feedback.warning) mesg = result.feedback.warning
          // if (result.feedback.suggestions && result.feedback.suggestions.length) {
          //   mesg += '.\nSuggestion: ' + result.feedback.suggestions[0]
          // }
          return mesg
        } else return 'All OK'
      }
    },
    async resetUserPassword () {
      this.$v.email.$touch()
      this.$v.newPassword.$touch()
      this.$v.newPassword2.$touch()
      if (this.$v.email.$error || this.$v.newPassword.$error || this.$v.newPassword2.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          await API.resetPassword(this.token, this.newPassword)

          this.$q.dialog({
            title: 'New password set',
            message: 'Now you need to login.',
            ok: true,
            cancel: false,
            preventClose: true
          }).then(() => {
            this.$router.push('/login')
          })
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot change password: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>
