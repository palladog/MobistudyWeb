<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-lg newUserBox">
          <q-card-title>User Registration
            <span slot="subtitle">Only available to researchers</span>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-field label="Email" helper="Enter your email." :error="$v.email.$error" error-label="An email address is required.">
              <q-input v-model.trim="$v.email.$model" type="email" placeholder=" e.g. email@email.com" @blur="$v.email.$touch" clearable/>
            </q-field>
            <q-field class="q-mt-md" label="Password" helper="Enter your password." :error="$v.password.$error" :error-label="getFirstPwdCheckError(password)">
              <q-input v-model.trim="$v.password.$model" type="password" placeholder="xxxxxxxx" @blur="$v.password.$touch" clearable/>
            </q-field>
            <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." :error="$v.password2.$error" :error-label="getFirstPwdCheckError(password2)">
              <q-input v-model.trim="$v.password2.$model" type="password" placeholder="xxxxxxxx" @blur="$v.password2.$touch" clearable/>
            </q-field>
            <div class ="row q-mt-md">
              <div class = "col-5">
                <q-btn label="Cancel Registration" color="warning" @click="cancelRegistration"/>
              </div>
              <div class = "col-4">
              </div>
              <div class = "col-3">
                <q-btn label="Register" color="primary" @click="validationCheck"/>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.newUserBox {
  min-width: 500px;
}
</style>

<script>
import API from '../data/API.js'
import { required, email } from 'vuelidate/lib/validators'
import owasp from '../../node_modules/owasp-password-strength-test/owasp-password-strength-test'

const checkPwdStrength = (pwd) => {
  return owasp.test(pwd).strong
}

owasp.config({
  allowPassphrases: true,
  maxLength: 70,
  minLength: 8,
  minPhraseLength: 10,
  minOptionalTestsToPass: 3
})

export default {
  data () {
    return {
      email: '',
      password: '',
      password2: ''
    }
  },
  validations: {
    email: { required, email },
    password: { required, checkPwdStrength },
    password2: { required, checkPwdStrength }
  },
  methods: {
    getFirstPwdCheckError (pwd) {
      let result = owasp.test(pwd)
      if (!result.strong) {
        return result.errors[0]
      } else return 'All OK'
    },
    cancelRegistration () {
      this.$router.push('/login')
    },
    validationCheck: function () {
      this.$v.email.$touch()
      this.$v.password.$touch()
      this.$v.password2.$touch()
      if (this.$v.email.$error || this.$v.password.$error || this.$v.password2.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else this.validatePassword()
    },
    validatePassword () {
      let userName = this.email.substring(0, this.email.indexOf('@'))
      // check if password includes spaces
      if (this.password.indexOf(' ') >= 0) {
        this.$q.notify({
          color: 'negative',
          message: 'You cannot include spaces in your password. Please Change it.',
          icon: 'report_problem'
        })
        return
      }
      // check if password includes name in email
      if (this.password.toUpperCase().includes(userName.toUpperCase())) {
        this.$q.notify({
          color: 'negative',
          message: 'Your password includes your username. Please Change it.',
          icon: 'report_problem'
        })
        return
      }
      // check if password and password2 match
      if (this.password2.toUpperCase() !== this.password.toUpperCase()) {
        this.$q.notify({
          color: 'negative',
          message: 'Your passwords do not match. Please Check your confirmation password.',
          icon: 'report_problem'
        })
        return
      }
      // If no issues, register user
      this.registerUser()
    },
    async registerUser () {
      try {
        await API.createUser({
          email: this.email,
          password: this.password,
          role: 'researcher'
        })
        await this.sendConfirmation()
        this.$q.dialog({
          title: 'User created',
          message: 'Your account has been created. A confirmation email has been sent to your email  address. Now you need to login.',
          ok: true,
          cancel: false,
          preventClose: true
        }).then(() => {
          this.$router.push('/login')
        })
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.$q.notify({
            color: 'negative',
            message: 'User already exists',
            icon: 'report_problem'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Registration failed: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    },
    async sendConfirmation () {
      try {
        await API.sendRegistrationConfirmation(this.email)
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Confirmation email could not be sent.',
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
