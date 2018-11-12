<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-sm loginBox">
          <q-card-title>Sign In</q-card-title>
          <q-card-main>
            <form autocomplete="on">
              <q-input v-model="email" type="email" float-label="Email" placeholder="e.g. email@email.com" autocomplete="on"/>
              <q-input v-model="password" type="password" float-label="Password" autocomplete="on" @keyup.enter="login()"/>
            </form>
          </q-card-main>
          <q-card-actions>
            <q-btn label="login" color="primary" @click="login()"/>
            <q-btn label="New User" color="secondary" @click="newUser()"/>
          </q-card-actions>
          <q-card-actions>
            <q-btn label="Recover lost password" flat color="primary" @click="recoverPassword()"/>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.loginBox {
  min-width: 300px;
}
</style>

<script>
import API from '../data/API.js'
import userinfo from '../data/userinfo.js'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        let user = await API.login(this.email, this.password)
        API.setToken(user.token)
        userinfo.login(user)

        if (user.role === 'researcher') {
          this.$router.push('researcher')
        } else this.$router.push('admin')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot login, wrong credentials',
            icon: 'report_problem'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Login failed: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    },
    async recoverPassword () {
      this.$q.notify('Not implemented yet!')
    },
    newUser () {
      this.$router.push('/newuser')
    }
  }
}
</script>
