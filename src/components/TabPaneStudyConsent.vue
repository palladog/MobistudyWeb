<template>
 <q-tab-pane name="tab-consent">
    <q-card class="form-card">
        <q-card-title>
            Consent
            <span slot="subtitle">Consent information viewed by participant</span>
        </q-card-title>
        <!-- Consent Tab: Invitation Message Card -->
        <q-card-main>
            <q-field label="Invitation Message" helper="The invitation message sent for the study.">
            <q-input v-model="consent.invitation" type="text"/>
            </q-field>
            <q-field label="Lay Description" helper="Layman's description of the study.">
            <q-input v-model="descriptionOfStudy" readonly type="textarea" rows="7"/>
            </q-field>
        </q-card-main>
    </q-card>
    <!-- Consent Tab: Privacy Policy Card -->
    <q-card class="form-card">
        <q-card-title>
            Privacy Policy
            <span slot="subtitle">Privacy information viewed by participant.</span>
        </q-card-title>
        <q-card-main>
            <q-field label="Privacy Message" helper="This the privacy policy for the study. It includes...">
            <q-input v-model="consent.privacyPolicy" readonly type="text"/>
            </q-field>
        </q-card-main>
    </q-card>
 </q-tab-pane>
</template>

<script>
export default {
  name: 'TabPaneStudyConsent',
  props: ['consent', 'generalities'],
  data () {
    return {
      descriptionOfStudy: ''
    }
  },
  async created () {
    this.descriptionOfStudy = this.generalities.description
  }
}
</script>
