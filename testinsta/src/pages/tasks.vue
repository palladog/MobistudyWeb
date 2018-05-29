<template>
  <q-page>
    <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="$q.notify('Tasks')"
      color="green"
      label="Tasks"
      />
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
      <q-btn class="nextbutton"
      label="Next Page"
      icon-right="arrow_forward"
      color="orange"
      @click="gotopageconsent"
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
.questionnaire-container{
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(218, 68, 255);
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
    gotopageconsent () {
      this.$router.push('pageconsent')
    }
  }
}
</script>
