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
          <ul class="flex-outer" id="title-form">
            <li>
              <label for="title-input">Title:</label>
              <input type="text" id="title-quest-form" placeholder="TITLE OF QUESTIONNAIRE">
            </li>
            <li>
              <label for="descr-input">Description:</label>
              <input type="text" id="descr-quest-form" class="form-rowdesc" placeholder="DESCRIPTION">
            </li>
          </ul>
      </form>
    </div>
    <div class="investigator-section-container">
        <ul class="flex-outer" id="list-investigator-form">
          <li>
            <label>Principal investigator(s):</label>
            <q-btn color="primary" icon="add" label="Add" @click="addRowInvestigator" />
            <q-btn color="red" icon="remove" label="Remove" @click="removeRowInvestigator" />
          </li>
        </ul>
      <form action="">
        <ul class="flex-outer" id="investigator-form">
          <li>
            <label for="name-input">Name/Title:</label>
            <input type="text" id="name-investigator-form" placeholder="NAME/TITLE">
          </li>
           <li>
            <label for="contact-input">Contact:</label>
            <input type="text" id="contact-investigator-form" placeholder="CONTACT">
          </li>
          <li>
            <label for="institution-input">Institution:</label>
            <input type="text" id="institution-investigator-form" placeholder="INSTITUTION">
          </li>
        </ul>
      </form>
      <div id=repeat-after-Investigator></div>
    </div>
    <div class="institution-section-container">
        <ul class="flex-outer" id="list-institution-form">
          <li>
            <label>Institutions:</label>
            <q-btn color="primary" icon="add" label="Add" @click="addRowInstitution" />
            <q-btn color="red" icon="remove" label="Remove" @click="removeRowInstitution" />
          </li>
        </ul>
      <form action="">
        <ul class="flex-outer" id="institution-form">
          <li>
            <label for="name-input">Name of institution:</label>
            <input type="text" id="name-institution-form" placeholder="NAME OF INSTITUION">
          </li>
           <li>
            <label for="contact-input">Contact for institution:</label>
            <input type="text" id="contact-institution-form" placeholder="CONTACT FOR INSTITUTION">
          </li>
          <li>
            <label for="contact-input">Data Access:</label>
              <q-radio v-model="radio1" val="one" color="secondary" label="NO" />
              <q-radio v-model="radio1" val="two" color="amber" label="ANON" />
              <q-radio v-model="radio1" val="three" color="red" label="FULL" />
          </li>
        </ul>
      </form>
      <div id=repeat-after-Institution></div>
    </div>
    <div class="dates-section-container">
        <form action="">
          <ul class="flex-outer" id="date-form">
            <li>
              <label for="date-input">Start Date:</label>
              <q-datetime class="date-input" v-model="dateStart" type="date" format="D-MMM-YYYY" stack-label='Start Date' />
            </li>
            <li>
              <label for="date-input">End Date:</label>
              <q-datetime class="date-input" v-model="dateEnd" type="date" format="D-MMM-YYYY" stack-label='End Date' />
            </li>
          </ul>
        </form>
    </div>
    <div class="next-container">
      <q-btn class="next-button"
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

.form-rowdesc {
  padding: 10px 0;
  height: 250px;
  display: flex;
}
/* Principal Investigator */
.investigator-section-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: #444;
}

/* Institution */
.institution-section-container {
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgb(97, 35, 94);
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

.next-button{
  width: 25%;
  display: flex;
  margin-left: auto;
}
</style>

<script>

export default {
  data () {
    return {
      dateStart: null,
      dateEnd: null,
      radio1: 'one'
    }
  },
  methods: {
    gotopagecriteria () {
      this.$router.push('pageCriteria')
    },
    addRowInvestigator () {
      var itm = document.getElementById('investigator-form')
      var cln = itm.cloneNode(true)
      document.getElementById('repeat-after-Investigator').appendChild(cln)
    },
    removeRowInvestigator () {
      var list = document.getElementById('investigator-form')
      if (list.hasChildNodes()) {
        list.removeChild(list.childNodes[0])
      }
    },
    addRowInstitution () {
      var itm = document.getElementById('institution-form')
      var cln = itm.cloneNode(true)
      document.getElementById('repeat-after-Institution').appendChild(cln)
    },
    removeRowInstitution () {
      var list = document.getElementById('institution-form')
      if (list.hasChildNodes()) {
        list.removeChild(list.childNodes[0])
      }
    }
  }
}
</script>
