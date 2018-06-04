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
    <div class="data-query-container">
      <form action="">
        <div class="form-rowdesc">
          <label for="dataquery">DATA QUERY:</label>
          <input type="text" id="dataQuery">
        </div>
      </form>
    </div>
    <div class="questionnaire-container">
      <form action="">
        <div class="form-rowdesc">
          <label for="quest">FORM BUILDER:</label>
          <input type="text" id="form builder">
        </div>
      </form>
    </div>
    <div class="next-container">
      <q-btn class="previous-button"
      label="Previous Page"
      icon="arrow_back"
      color="orange"
      @click="gotopageCriteria"
      >
      </q-btn>
      <q-btn class="next-button"
      label="Next Page"
      icon-right="arrow_forward"
      color="orange"
      @click="gotopageConsent"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<style>
/* Data Query*/
.data-query-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: #FFF444;
}

.form-row {
  padding: 10px 0;
  height: 50px;
  display: flex;
}

.form-row label {
  padding-right: 190px;
}

.form-row input {
  flex: 1;
}

.form-rowdesc {
  padding: 10px 0;
  height: 250px;
  display: flex;
}

.form-rowdesc label {
  padding-right: 100px;
}

.form-rowdesc input {
  flex: 1;
}

/* Form Questionnaire Builder*/
.questionnaire-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(218, 68, 255);
}
/*Next button*/
.next-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(60, 122, 141);
}

.next-button {
  width: 25%;
  display: flex;
  margin-left: auto;
}

.previous-button {
  width: 25%;
  display: flex;
}

</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    gotopageCriteria () {
      this.$router.push('pageCriteria')
    },
    gotopageConsent () {
      this.$router.push('pageConsent')
    }
  }
}
</script>
