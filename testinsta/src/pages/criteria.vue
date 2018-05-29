<template>
  <q-page>
    <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="$q.notify('Criteria')"
      color="primary"
      label="Include Criteria"
      />
    </div>
    <div class="form-age-container">
      <form action="">
        <div class="form-age">
          <label for="agerange">AGE RANGE:</label>
          <input class="age-min-input" type="number" id="agemin" placeholder="MIN">
          <input class="age-max-input" type="number" id="agemax" placeholder="MAX">
        </div>
        <div class="form-gender">
          <label for="genderchoice">SEX:</label>
          <q-checkbox v-model="checkArray" label="M" color="red" val="one" />
          <q-checkbox v-model="checkArray" label="F" val="two" color="secondary" style="margin-left: 10px" />
          <q-checkbox v-model="checkArray" label="OTHER" val="three" color="red" style="margin-left: 10px" />
        </div>
        <div class="form-disease">
          <label for="disease">DISEASE (Clinical conditions):</label>
          <input class="disease-input" type="text" id="diseaseID" placeholder="Disease">
        </div>
        <div class="form-meds">
          <label for="meds">MEDS:</label>
          <input class="meds-input" type="text" id="medsID" placeholder="Meds">
        </div>
      </form>
    </div>
    <div class="investigator-section-container">
      <div class="sectionlabel">
        <label>CUSTOM CRITERIA:</label>
      </div>
      <table class="customcriteriatable">
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{row.id}}</td>
            <td>
              <input class="form-control" placeholder="name" v-model="row.criteriaquestion" />
            </td>
            <td>
                <q-btn color="primary" icon="add" label="Add" @click="addrow" />
                <q-btn color="red" icon="remove" label="Remove" @click="removerow" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="next-container">
      <q-btn class="nextbutton"
      label="Next Page"
      icon-right="arrow_forward"
      color="orange"
      @click="gotopageTasks"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<style>
/* title description */
.form-age-container {
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
/* table investigator */
.investigator-section-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: #444;
}
.sectionlabel{
  flex:1;
}
table.customcriteriatable {
  width: 70%;
  margin-left: auto;
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
   }

.investigatortable th, .investigatortable td {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0.25em;
}

.investigatortable tr {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #DDD;
}
/*Next button*/
.next-container{
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(60, 122, 141);
}

.nextbutton{
  width: 25%;
  flex: 1;
  margin-left: auto;
}
</style>

<script>

export default {
  data () {
    return {
      checkArray: ['one'],
      rows: [
        {id: 1, criteriaquestion: 'Question-example'}
      ]
    }
  },
  methods: {
    gotopageTasks () {
      this.$router.push('pagetasks')
    },
    addrow (index) {
      this.rows.splice(index + 1, 0, {})
    },
    removerow (index) {
      this.rows.splice(index, 1)
    }
  }
}
</script>
