<template>
  <q-page>
    <div>
      <q-tabs align="justify">
        <q-route-tab slot="title" name="tab-1" icon="subject" label="Generalities" to="/" exact />
        <q-route-tab slot="title" name="tab-2" icon="fingerprint" label="Inclusion Criteria" to="/pagecriteria" exact />
        <q-route-tab slot="title" name="tab-3" icon="list" label="Tasks" to="/pagetasks" exact />
        <q-route-tab slot="title" name="tab-4" icon="verified_user" label="Consent" to="/pageconsent" exact />
      </q-tabs>
    </div>
    <q-card class="bg-cyan-2 q-ma-xl">
      <q-card-title>
        Consent
        <span slot="subtitle">Consent form that is viewed by participant</span>
      </q-card-title>
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
    <div class="next-container">
      <q-btn class="nextbutton"
      label="REVIEW BEFORE SUBMISSION"
      color="orange"
      @click="gotopageSubmissionPreview"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<style>
/*Next button*/
.next-container{
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgba(60, 122, 141, 0.7);
}

.nextbutton{
  width: 100%;
  display: flex;
}
</style>

<script>
export default {
  data () {
    return {
      check1: true
    }
  },
  methods: {
    gotopageSubmissionPreview () {
      this.$router.push('submissionPreview')
    }
  }
}
</script>
