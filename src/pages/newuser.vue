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
            <q-field class="q-mt-md" label="Password" helper="Enter your password." :error="$v.newPassword.$error" error-label="A password is required.">
              <q-input v-model.trim="$v.newPassword.$model" type="password" placeholder="xxxxxxxx" @blur="$v.newPassword.$touch" clearable/>
            </q-field>
            <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." :error="$v.confirmPassword.$error" error-label="A password is required.">
              <q-input v-model.trim="$v.confirmPassword.$model" type="password" placeholder="xxxxxxxx" @blur="$v.confirmPassword.$touch" clearable/>
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

export default {
  data () {
    return {
      email: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  validations: {
    email: { required, email },
    newPassword: { required },
    confirmPassword: { required }
  },
  methods: {
    cancelRegistration () {
      this.$router.push('/login')
    },
    validationCheck: function () {
      this.$v.email.$touch()
      this.$v.newPassword.$touch()
      this.$v.confirmPassword.$touch()
      if (this.$v.email.$error || this.$v.newPassword.$error || this.$v.confirmPassword.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else this.validatePassword()
    },
    validatePassword () {
      let userName = this.email.substring(0, this.email.indexOf('@'))
      // check if password includes spaces
      if (this.newPassword.indexOf(' ') >= 0) {
        this.$q.notify({
          color: 'negative',
          message: 'You cannot include spaces in your password. Please Change it.',
          icon: 'report_problem'
        })
        return
      }
      // check if password includes name in email
      if (this.newPassword.toUpperCase().includes(userName.toUpperCase())) {
        this.$q.notify({
          color: 'negative',
          message: 'Your password includes your username. Please Change it.',
          icon: 'report_problem'
        })
        return
      }
      // check if password and confirmPassword match
      if (this.confirmPassword.toUpperCase() !== this.newPassword.toUpperCase()) {
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
          password: this.newPassword,
          role: 'researcher'
        })

        this.$q.dialog({
          title: 'User created',
          message: 'Your account has been created, now you need to login.',
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
    }
  }
}
</script>
