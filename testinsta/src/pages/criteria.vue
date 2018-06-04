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
    <div class="form-age-container">
      <form action="">
        <ul class="flex-outer">
          <li>
            <label for="age-range-form">AGE RANGE:</label>
            <input type="number" id="agemin" placeholder="MIN">
            <input type="number" id="agemax" placeholder="MAX">
          </li>
          <li>
            <label for="gender-form">SEX:</label>
            <ul class="flex-inner">
              <q-checkbox v-model="checkArray" label="M" color="red" val="one" />
              <q-checkbox v-model="checkArray" label="F" val="two" color="secondary" style="margin-left: 10px" />
              <q-checkbox v-model="checkArray" label="OTHER" val="three" color="red" style="margin-left: 10px" />
            </ul>
          </li>
          <li>
            <label for="disease-choice">DISEASE (Clinical conditions):</label>
            <input type="text" id="disease-form" placeholder="Disease">
          </li>
          <li>
            <label for="lifestyle-choice">LIFESTYLE:</label>
            <input type="text" id="lifestyle-form" placeholder="Lifestyle">
          </li>
          <li>
            <label for="meds">MEDS:</label>
            <input type="text" id="meds-form" placeholder="Lifestyle">
          </li>
        </ul>
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
      <q-btn class="previous-button"
      label="Previous Page"
      icon="arrow_back"
      color="orange"
      @click="gotopageGeneralities"
      >
      </q-btn>
      <q-btn class="next-button"
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
.flex-outer li,
.flex-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.flex-outer > li > label,
.flex-outer li p {
  flex: 1 0 120px;
  max-width: 220px;
}

.flex-outer > li > label + *,
.flex-inner {
  flex: 1 0 220px;
}

.flex-inner li {
  width: 100px;
}

.flex-inner {
  justify-content: space-between;
}
/* Spacing between*/
.flex-outer > li:not(:last-child) {
  margin-bottom: 20px;
}

.form-age-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: #FFF444;
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
      checkArray: ['one'],
      rows: [
        {id: 1, criteriaquestion: 'Question-example'}
      ]
    }
  },
  methods: {
    gotopageGeneralities () {
      this.$router.push('/')
    },
    gotopageTasks () {
      this.$router.push('pageTasks')
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
