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
    <div class="title-descr-container">
      <form action="">
        <ul class="flex-outer" id="invitation-form">
          <li>
            <label for="invimessage">INVITATION MESSAGE:</label>
            <input type="text" class="form-rowdesc" id="invi-message-form">
          </li>
          <li>
            <label for="layDescr">LAY DESCRIPTION:</label>
            <input type="text" class="form-rowdesc" id="lay-description-form">
          </li>
          <li>
            <label for="gender-form">Consent Question:</label>
            <ul class="flex-inner">
              <q-checkbox v-model="checkArray" label="Dynamic" color="secondary" val="one" />
            </ul>
          </li>
        </ul>
      </form>
    </div>
    <div class="privacy-policy-container">
      <form action="">
        <ul class="flex-outer" id="privacy-form">
          <li>
            <label for="privapolicy">PRIVACY POLICY:</label>
            <input type="text" class="form-rowdesc" id="privacy-policy-form">
          </li>
        </ul>
      </form>
    </div>
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
/* Invitation description */
.title-descr-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgba(38, 134, 138, 0.2);
}

/* Lists */
.flex-outer li{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-transform: uppercase;
}

.flex-outer > li > label,
.flex-outer li p {
  flex: 1 0 120px;
  max-width: 220px;
}

.flex-outer > li > label + * {
  flex: 1 0 220px;
}

/* Spacing between*/
.flex-outer > li:not(:last-child) {
  margin-bottom: 20px;
}

.form-rowdesc {
  padding: 10px 0;
  height: 250px;
  display: flex;
}

/* Privacy Policy */
.privacy-policy-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(255, 211, 68);
}

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
      checkArray: ['one']
    }
  },
  methods: {
    gotopageSubmissionPreview () {
      this.$router.push('submissionPreview')
    }
  }
}
</script>
