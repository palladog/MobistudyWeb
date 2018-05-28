<template>
  <q-page>
    <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="$q.notify('General Items')"
      color="negative"
      label="General Items"
      />
    </div>
    <div class="title-descr-container">
      <form action="">
        <div class="form-row">
          <label for="name">Title:</label>
          <input type="text" id="name">
        </div>
        <div class="form-rowdesc">
          <label for="favColor">Short Description:</label>
          <input type="text" id="favColor">
        </div>
      </form>
    </div>
    <div class="investigator-section-container">
      <div class="sectionlabel">
        <label>Principal investigator(s):</label>
      </div>
      <table class="investigatortable">
<!--         <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Institution</th>
          </tr>
        </thead> -->

        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{row.id}}</td>
            <td>
              <input class="form-control" placeholder="name" v-model="row.name" />
            </td>
            <td>
              <input class="form-control" placeholder="contact" v-model="row.contact" />
            </td>
            <td>
              <input class="form-control" placeholder="institution" v-model="row.institution" />
            </td>
            <td>
                <q-btn color="primary" icon="add" label="Add" @click="addrow" />
                <q-btn color="red" icon="remove" label="Remove" @click="removerow" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="dates-section-container">
      <div class="sectionlabel">
        <label>Start Date:</label>
        <q-datetime class="date-input" v-model="model" type="date" stack-label='Start Date' />
        <label>End Date:</label>
        <q-datetime class="date-input" v-model="model" type="date" stack-label='End Date' />
      </div>
    </div>
    <div class="next-container">
      <q-btn class="nextbutton"
      label="Next Page"
      icon-right="arrow_forward"
      color="orange"
      @click="gotopagecriteria"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<style>
/* title description */
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
table.investigatortable {
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
/* Date Section */
.dates-section-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(119, 141, 60);
}

.date-input {
  width: 50%;
  flex: 1;
  margin-left: auto;
}
/*Next button*/
.next-container{
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(60, 122, 141);
  display: flex;
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
      rows: [
        {id: 1, name: 'Rad', contact: 'london', institution: 'mBA'},
        {id: 3, name: 'Redf', contact: 'Len', institution: 'And'}
      ]
    }
  },
  methods: {
    gotopagecriteria () {
      this.$router.push('pagecriteria')
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
