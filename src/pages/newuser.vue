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
            <q-field label="Email" helper="Enter your email." >
              <q-input v-model="email" type="email" placeholder=" e.g. email@email.com" />
            </q-field>
            <q-field class="q-mt-md" label="Password" helper="Enter your password." >
              <q-input v-model="newPassword" type="password" placeholder="xxxxxxxx"/>
            </q-field>
            <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." >
              <q-input v-model="confirmPassword" type="password" placeholder="xxxxxxxx" />
            </q-field>
            <div class ="row q-mt-md">
              <div class = "col-9">
              </div>
              <div class = "col-3">
                <q-btn label="Register" color="primary" @click="registerUser()"/>
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

export default {
  data () {
    return {
      email: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
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
