<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-sm loginBox">
          <q-card-title v-show="!email">Reset your password</q-card-title>
          <q-card-title v-show="email">Reset password for {{ email }}</q-card-title>
          <q-card-main>
            <q-card-main>
              <q-field label="Token" helper="As received on your email." :error="$v.token.$error" error-label="A token is required." >
                <q-input v-model.trim="$v.token.$model" type="text" @blur="$v.token.$touch" clearable/>
              </q-field>
              <q-field class="q-mt-md" label="Password" helper="Enter a new password." :error="$v.newPassword.$error" error-label="A password is required.">
                <q-input v-model.trim="$v.newPassword.$model" type="password" @blur="$v.newPassword.$touch" clearable/>
              </q-field>
              <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." :error="$v.newPassword2.$error" error-label="A password is required.">
                <q-input v-model.trim="$v.newPassword2.$model" type="password" @blur="$v.newPassword2.$touch" clearable/>
              </q-field>
            </q-card-main>
          </q-card-main>
          <q-card-actions>
            <q-btn label="reset" color="primary" @click="validationCheck"/>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import API from '../data/API.js'
import userinfo from '../data/userinfo.js'
import { required } from 'vuelidate/lib/validators'

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
    newPassword: { required },
    newPassword2: { required }
  },
  created () {
    if (this.$route.query.email) this.email = this.$route.query.email
    if (this.$route.query.token) this.token = this.$route.query.token
  },
  methods: {
    validationCheck: function () {
      this.$v.token.$touch()
      this.$v.newPassword.$touch()
      this.$v.newPassword2.$touch()
      if (this.$v.token.$error || this.$v.newPassword.$error || this.$v.newPassword2.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else this.validatePassword()
    },
    validatePassword () {
      // check if password and password2 match
      if (this.newPassword2.toUpperCase() !== this.newPassword.toUpperCase()) {
        this.$q.notify({
          color: 'negative',
          message: 'Your passwords do not match. Please Check your confirmation password.',
          icon: 'report_problem'
        })
        return
      }
      // If no issues, reset Password
      this.resetUserPassword()
    },
    async resetUserPassword () {
      try {
        await API.resetPassword(this.token, this.newPassword)
        userinfo.logout()

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
</script>
