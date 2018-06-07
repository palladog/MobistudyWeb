<template>
  <q-page>
      <q-tabs color="secondary" glossy align="justify">
        <q-tab slot="title" default name="generalities" icon="subject" label="Generalities" />
        <q-tab slot="title" name="criteria" icon="fingerprint" label="Inclusion Criteria" />
        <q-tab slot="title" name="tasks" icon="list" label="Tasks"/>
        <q-tab slot="title" name="consent" icon="verified_user" label="Consent"/>
        <!-- General Tab -->
        <q-tab-pane name="generalities">Gen tab
          <!-- General Information Tab Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Generalities
              <span slot="subtitle">General information about the study</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Title" helper="Short name of the study">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Description" helper="Layman's description of the study">
                <q-input v-model="area" type="textarea" rows="7" clearable />
              </q-field>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Principal Investigator Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
             <q-card-title>Principal Investigator(s)
              <span slot="subtitle">Information concerning the principal investigators</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Name & Title" helper="Principal Investigator Name/Title">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Contact" helper="Contact Details, may include address">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Institution" helper="Name of Institution involved in study">
                <q-input v-model="text" clearable />
              </q-field>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Institutions Card To implement lists with button -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Date Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
                <q-card-title>
                  Dates Of Study
                  <span slot="subtitle">The Start and End Dates of the study</span>
                </q-card-title>
                  <q-card-main>
                    <q-card-actions>
                      <q-field label="Start Date" />
                      <q-datetime class="q-ml-xl" v-model="dateStart" type="date" format="D-MMM-YYYY" clearable />
                    </q-card-actions>
                    <q-card-actions>
                      <q-field label="End Date" />
                      <q-datetime class="q-ml-xl" v-model="dateEnd" type="date" format="D-MMM-YYYY" clearable />
                    </q-card-actions>
                  </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Criteria Tab -->
        <q-tab-pane name="criteria">Crit tab
        </q-tab-pane>
        <!-- Tasks Tab -->
        <q-tab-pane name="tasks">Tasks tab
        </q-tab-pane>
        <!-- Consent Tab -->
        <q-tab-pane name="consent">Consent tab
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>
              Consent
              <span slot="subtitle">Consent form that is viewed by participant</span>
            </q-card-title>
            <!-- Consent Tab: Invitation Message Card -->
            <q-card-main>
              <q-field label="Invitation Message" helper="The invitation message sent for the study">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
              <q-field label="Lay Description" helper="Layman's description of the study">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
              <p class="caption">Consent Question:</p>
              <q-checkbox v-model="check1" color="positive" label="Dynamic" left-label />
            </q-card-main>
          </q-card>
          <!-- Consent Tab: Privacy Policy Card -->
          <q-card class="bg-amber-3 q-ma-xl">
            <q-card-title>
              Privacy Policy
              <span slot="subtitle">Privacy form that is viewed by participant.</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Privacy Message" helper="This the privacy policy for the study. It includes...">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
            </q-card-main>
          </q-card>
        </q-tab-pane>
      </q-tabs>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      dateStart: null,
      dateEnd: null
    }
  }
}
</script>

<style>
</style>
