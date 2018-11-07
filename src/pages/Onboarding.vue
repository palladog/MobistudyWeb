<template>
    <q-page>
        <!-- Login card -->
        <q-card class="form-onboarding-card q-pa-lg">
            <q-card-title>Sign In</q-card-title>
            <q-card-separator />
            <q-card-main>
                <q-field label="Email" helper="Enter your email." >
                    <q-input v-model="username" type="email" placeholder=" e.g. email@email.com" />
                </q-field>
                <q-field class="q-mt-md" label="Password" helper="Enter your password." >
                    <q-input v-model="password" type="password" placeholder="xxxxxxxx" no-pass-toggle clearable />
                </q-field>
                <div class ="row q-mt-md">
                    <div class = "col-4">
                        <q-btn label="New User" color="secondary" @click="newUserDialog()"/>
                    </div>
                    <div class = "col-6">
                    </div>
                    <div class = "col-2">
                        <q-btn label="login" color="primary" @click="login()"/>
                    </div>
                </div>
            </q-card-main>
        </q-card>
        <!-- User Registration -->
        <q-card class="form-onboarding-card q-pa-lg">
            <q-card-title>User Registration
                <span slot="subtitle">Create a new user</span>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
                <q-field label="Email" helper="Enter your email." >
                    <q-input v-model="username" type="email" placeholder=" e.g. email@email.com" />
                </q-field>
                <q-field class="q-mt-md" label="Password" helper="Enter your password." >
                    <q-input v-model="newPassword" type="password" placeholder="xxxxxxxx" initial-show-password clearable />
                </q-field>
                <q-field class="q-mt-md" label="Repeat Password" helper="Please confirm your password." >
                    <q-input v-model="confirmPassword" type="password" placeholder="xxxxxxxx" initial-show-password clearable />
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
        <!-- List of Studies -->
        <q-card class="form-onboarding-card q-pa-lg">
            <q-card-title>Studies
                <span slot="subtitle">List of Studies</span>
                <q-btn class="float-right" round icon="settings" color="black" @click="openSettings()"/>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
                <q-field label="Email" helper="Enter your email." >
                    <q-input v-model="username" type="email" placeholder=" e.g. email@email.com" />
                </q-field>
                <div class ="row q-mt-md">
                    <q-btn label="Create New Study" color="secondary" @click="createNewStudy()"/>
                </div>
            </q-card-main>
        </q-card>
        <!-- List of Studies -->
        <q-card class="form-onboarding-card q-pa-lg">
            <q-card-title>Settings
                <q-btn class="float-right" round icon="close" color="black" @click="closeSettings()"/>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
                <q-field label="Email" helper="Enter your email." >
                    <q-input v-model="username" type="email" placeholder=" e.g. email@email.com" />
                </q-field>
                <div class ="row q-mt-md">
                    <div class = "col-8">
                     </div>
                    <div class = "col-4">
                        <q-btn label="Save Settings" color="primary" @click="saveSettings()"/>
                    </div>
                </div>
            </q-card-main>
        </q-card>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    createNewStudy () {
    // Call Study Design
      this.$q.notify('Create new study')
    },
    login () {
      this.$q.notify('Login clicked')
    },
    newUserDialog () {
      this.$q.notify('New User clicked')
    },
    openSettings () {
      this.$q.notify('Settings clicked')
    },
    registerUser () {
      this.$q.notify('Register User')
    },
    closeSettings () {
      this.$q.notify('Close Settings')
    },
    saveSettings () {
      this.$q.notify('Save Settings')
    }
  }
}
</script>
