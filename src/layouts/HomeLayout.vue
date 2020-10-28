<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'" >
      <img src="statics/icons/favicon-32x32.png" alt="MobiStudy-logo">
        <q-toolbar-title>
          MobiStudy
          <span slot="subtitle">{{ welcomeLabel }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="exit_to_app" @click="logout()" aria-label="Logout" />
      </q-toolbar>

    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from '../../package.json'
import API from '../modules/API.js'
import userinfo from '../modules/userinfo.js'

export default {
  name: 'HomeLayout',
  data () {
    return {
      version: version
    }
  },
  computed: {
    welcomeLabel () {
      return 'Hello ' + userinfo.getUser().email + '. You are logged in as ' + userinfo.getUser().role + '.'
    }
  },
  methods: {
    logout () {
      userinfo.logout()
      API.setToken('')
      this.$router.push('/login')
    }
  }
}
</script>
