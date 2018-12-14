<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'" >
        <q-toolbar-title>
          MobiStudy
          <span slot="subtitle">Version {{ version }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="exit_to_app" @click="logout()" aria-label="Logout" />
      </q-toolbar>

    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from '../../package.json'
import API from '../data/API.js'
import userinfo from '../data/userinfo.js'

export default {
  name: 'HomeLayout',
  data () {
    return {
      version: version
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
