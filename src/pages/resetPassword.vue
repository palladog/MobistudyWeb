<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-sm loginBox">
          <q-card-title v-show="!email">Reset your password</q-card-title>
          <q-card-title v-show="email">Reset password for {{ email }}</q-card-title>
          <q-card-main>
            <q-card-main>
              <q-field label="Token" helper="As received on your email." >
                <q-input v-model="token" type="text" />
              </q-field>
              <q-field class="q-mt-md" label="Password" helper="Enter a new password." >
                <q-input v-model="newpassword" type="password"/>
              </q-field>
              <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." >
                <q-input v-model="newpassword2" type="password" />
              </q-field>
            </q-card-main>
          </q-card-main>
          <q-card-actions>
            <q-btn label="reset" color="primary" @click="resetpassword()"/>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import API from '../data/API.js'
import userinfo from '../data/userinfo.js'

export default {
  name: 'ResetPasswordPage',
  data () {
    return {
      email: undefined,
      token: '',
      newpassword: '',
      newpassword2: ''
    }
  },
  created () {
    if (this.$route.query.email) this.email = this.$route.query.email
    if (this.$route.query.token) this.token = this.$route.query.token
  },
  methods: {
    async resetpassword () {
      try {
        await API.resetPassword(this.token, this.newpassword)
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
