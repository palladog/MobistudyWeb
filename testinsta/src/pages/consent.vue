<template>
  <q-page>
    <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="$q.notify('Consent')"
      color="black"
      label="Consent"
      />
    </div>
    <div class="title-descr-container">
      <form action="">
        <div class="form-rowdesc">
          <label for="invimessage">INVITATION MESSAGE:</label>
          <input type="text" id="inviMessage">
        </div>
        <div class="form-rowdesc">
          <label for="layDescr">LAY DESCRIPTION:</label>
          <input type="text" id="layDescription">
        </div>
      </form>
    </div>
    <div class="privacy-policy-container">
      <form action="">
        <div class="form-rowdesc">
          <label for="privapolicy">PRIVACY POLICY:</label>
          <input type="text" id="privacyPolicy">
        </div>
      </form>
    </div>
    <div class="next-container">
      <q-btn class="nextbutton"
      label="REVIEW BEFORE SUBMISSION"
      color="orange"
      @click="gotopagecriteria"
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
  background-color: rgb(60, 122, 141);
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    gotopagecriteria () {
      this.$router.push('/')
    }
  }
}
</script>
