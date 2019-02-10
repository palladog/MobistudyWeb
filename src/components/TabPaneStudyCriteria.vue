<template>
  <q-tab-pane name="tab-crit">
    <!-- Inclusion Criteria Tab Card -->
    <q-card class="form-card">
      <q-card-title>Inclusion Criteria
        <span slot18="subtitle">Criteria to filter participants for the study</span>
      </q-card-title>
      <q-card-main>
      <!-- Age Range & Sex -->
        <q-field label="Age range:" helper="Desired age range of the participants.">
          <div class="row gutter-lg justify-center">
            <div class="col-6">
              <q-input v-model.trim="criteria.minAge" type="number" align="center" min="0" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Minimum Age of participants" clearable/>
            </div>
            <div class="col-6">
              <q-input v-model.trim="criteria.maxAge" type="number" align="center" min="0" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Maximum Age of participants" clearable/>
            </div>
          </div>
        </q-field>
        <q-field label="Gender:" helper="Desired gender.">
          <q-checkbox class="q-mr-lg" v-model="criteria.gender" label="Male" color="secondary" val="male" />
          <q-checkbox class="q-mr-lg" v-model="criteria.gender" label="Female" color="secondary" val="female" />
          <q-checkbox v-model="criteria.gender" label="Other" color="secondary" val="other" />
        </q-field>
      </q-card-main>
    </q-card>
    <q-card class="form-card">
      <q-card-main>
      <!-- Number of Participants -->
        <q-field label="Maximum number of participants:" helper="This is optional and consists of participants who will have either accepted, completed or withdrawn from the study.">
          <q-input v-model.trim="criteria.numberOfParticipants" type="number" align="center" min="0" onkeypress="return event.charCode >= 48 && event.charCode <= 57" clearable/>
        </q-field>
      </q-card-main>
    </q-card>
    <!-- Disease, Lifestyle and Meds -->
    <q-card class="form-card">
      <q-card-main>
        <q-field label="List of Diseases:" helper="Type in and select the list of diseases that the patient will need to have">
          <q-chips-input v-model="diseasesVue" placeholder="Select from list" @duplicate="duplicatedDisease">
            <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
          </q-chips-input>
        </q-field>

        <q-field label="Medications:" helper="Type in and select the list of needed medications (only generics)">
          <q-chips-input v-model="medsVue" placeholder="Select from list" @duplicate="duplicatedMeds">
            <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
          </q-chips-input>
        </q-field>

        <q-field label="Lifestyle:" helper="Select the applicable lifestyle criteria, they will all be matched">
          <div class="row">
            <q-radio class="col" v-model="criteria.lifestyle.active" val="yes" color="secondary" label="Active" />
            <q-radio class="col" v-model="criteria.lifestyle.active" val="no" color="secondary" label="Not active" style="margin-left: 10px" />
            <q-radio class="col" v-model="criteria.lifestyle.active" val="notrequired" color="secondary" label="Not required" style="margin-left: 10px" />
          </div>
           <q-item-separator />
          <div class="row">
            <q-radio class="col" v-model="criteria.lifestyle.smoker" val="yes" color="secondary" label="Smoker" />
            <q-radio class="col" v-model="criteria.lifestyle.smoker" val="no" color="secondary" label="Non smoker" style="margin-left: 10px" />
            <q-radio class="col" v-model="criteria.lifestyle.smoker" val="notrequired" color="secondary" label="Not required" style="margin-left: 10px" />
          </div>
        </q-field>
      </q-card-main>
    </q-card>
    <!-- Custom Criteria Questions -->
    <q-card class="form-card">
      <q-card-title>Custom Criteria Question(s)
        <span slot="subtitle">Please enter additional criteria questions. Questions only allow yes/no answers.</span>
      </q-card-title>
      <q-card-main>
        <div v-for="(criteriaQuestion, index) in criteria.criteriaQuestions" :key="index">
          <q-field label="Criteria Question:" helper="Please enter a question. (e.g. Are you a smoker?)">
            <q-input v-model="criteriaQuestion.title" type="text" clearable />
          </q-field>
          <q-field class="q-mt-md" label="Participant Answer:" helper="This is the answer that make the patient eligible.">
            <q-radio class="q-mr-lg" v-model="criteriaQuestion.answer" val="yes" color="secondary" label="Yes" />
            <q-radio v-model="criteriaQuestion.answer" val="no" color="full" label="No" style="margin-left: 10px" />
          </q-field>
          <div class="row justify-center">
            <div class="col">
              <q-btn class="vertical-top" v-show="index !==0" label="Remove this Question" color="negative" icon="remove" @click="removeRowCriteriaQuestion(index)" />
            </div>
            <div class="col">
              <q-btn v-show="index == criteria.criteriaQuestions.length-1" label="Add Question" color="primary" icon="add" @click="addRowCriteriaQuestion(index)" />
            </div>
          </div>
          <q-card-separator v-show="index != criteria.criteriaQuestions.length-1"/>
        </div>
      </q-card-main>
    </q-card>
  </q-tab-pane>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TabPaneStudyCriteria',
  props: ['criteria', 'v'],
  computed: {
    diseasesVue: {
      get: function () {
        return this.criteria.diseases.map(x => x.name)
      },
      set: function (names) {
        this.criteria.diseases = this.criteria.diseases.filter(x => {
          return names.includes(x.name)
        })
      }
    },
    medsVue: {
      get: function () {
        return this.criteria.medications.map(x => x.name)
      },
      set: function (names) {
        this.criteria.medications = this.criteria.medications.filter(x => {
          return names.includes(x.name)
        })
      }
    }
  },
  methods: {
    searchDisease (diseaseDescription, done) {
      // Declare top level URL vars
      var baseUrl = 'https://browser.ihtsdotools.org/api/v1/snomed/'
      var edition = 'en-edition'
      var version = '20180131'
      // Construct Disease Query URL
      var diseaseQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(diseaseDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=disorder' + '&returnLimit=100&normalize=true'
      this.loading = true
      // axios.get('http://browser.ihtsdotools.org/api/v1/snomed//en-edition/v20180131/descriptions?query=heart%20attack&limit=50&searchMode=partialMatching&lang=english&statusFilter=activeOnly&skipTo=0&returnLimit=100&normalize=true')
      axios.get(diseaseQueryURL)
        .then((response) => {
          this.loading = false
          const dataDis = response.data
          // Filter out already selected diseases
          let resFiltByLen = dataDis.matches.filter(entry => entry['term'].length < 50)
          const selDis = Object.keys(this.criteria.diseases)
          var disFil = resFiltByLen.filter((entry) => !selDis.includes(entry.term))
          if (disFil.length === 0) {
            this.$q.notify('There are no more matching items with the current terms. Please search for other diseases.')
          }
          const resultD = disFil.map((item) => {
            return {
              label: item.term,
              value: item.term,
              conceptId: item.conceptId
            }
          })
          done(resultD)
        }, (error) => {
          this.$q.notify('There has been an error during the retrieval of this query. Please Try again.')
          console.error(error)
          this.loading = false
          done([])
        })
    },
    selectedDisease (item) {
      if (!this.criteria.diseases.find(x => x.name === item.label)) {
        this.criteria.diseases.push({
          name: item.label,
          conceptId: item.conceptId
        })
      }
    },
    duplicatedDisease (label) {
      this.$q.notify(`"${label}" already in list`)
    },
    searchMeds (medDescription, done) {
      // Declare top level URL vars
      var baseUrl = 'https://browser.ihtsdotools.org/api/v1/snomed/'
      var edition = 'en-edition'
      var version = '20180131'
      // Construct medications Query URL
      var medQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(medDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=substance' + '&returnLimit=100&normalize=true'
      this.loading = true
      axios.get(medQueryURL)
        .then((response) => {
          this.loading = false
          const dataMed = response.data
          // Filter out already selected medications
          let resMedsFiltByLen = dataMed.matches.filter(entry => entry['term'].length < 40)
          const selMeds = Object.keys(this.criteria.medications)
          var medsFil = resMedsFiltByLen.filter((entry) => !selMeds.includes(entry.term))
          if (medsFil.length === 0) {
            this.$q.notify('There are no more matching items with the current terms. Please search for other medications.')
          }
          const resultM = medsFil.map((item) => {
            return {
              label: item.term,
              value: item.term,
              conceptId: item.conceptId
            }
          })
          done(resultM)
        }, (error) => {
          console.error(error)
          this.loading = false
          done([])
        })
    },
    selectedMeds (item) {
      if (!this.criteria.medications.find(x => x.name === item.label)) {
        this.criteria.medications.push({
          name: item.label,
          conceptId: item.conceptId
        })
      }
    },
    duplicatedMeds (label) {
      this.$q.notify(`"${label}" already in list`)
    },
    addRowCriteriaQuestion (index) {
      this.criteria.criteriaQuestions.push({
        title: '',
        answer: ''
      })
    },
    removeRowCriteriaQuestion (index) {
      this.criteria.criteriaQuestions.splice(index, 1)
    }
  }
}
</script>
