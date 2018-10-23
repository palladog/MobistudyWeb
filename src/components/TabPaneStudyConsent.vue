<template>
 <q-tab-pane name="tab-consent">
    <q-card class="bg-cyan-2 q-ma-xl">
        <q-card-title>
            Consent
            <span slot="subtitle">Consent form viewed by participant</span>
        </q-card-title>
        <!-- Consent Tab: Invitation Message Card -->
        <q-card-main>
            <q-field label="Invitation Message" helper="The invitation message sent for the study">
            <q-input v-model="cons.invitation" type="textarea" rows="7"/>
            </q-field>
            <q-field label="Lay Description" helper="Layman's description of the study">
            <q-input v-model="cons.description" type="textarea" rows="7"/>
            </q-field>
            <p class="caption">Consent Question:</p>
            <q-checkbox v-model="cons.dynamicCheck" color="positive" label="Dynamic" left-label />
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
            <q-input v-model="cons.privacy" readonly type="textarea" rows="7"/>
            </q-field>
        </q-card-main>
    </q-card>
 </q-tab-pane>
</template>

<script>
export default {
  name: 'TabPaneStudyConsent',
  props: ['consent'],
  computed: {
    cons: {
      get () { return this.consent },
      set (value) { this.$emit('updateCons', value) }
    }
  }
}
</script>
