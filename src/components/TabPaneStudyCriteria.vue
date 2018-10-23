<template>
  <q-layout view="lHh Lpr lFf">
<!-- Inclusion Criteria Tab Card -->
        <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Inclusion Criteria
                <span slot="subtitle">Criteria to filter participants in the study</span>
            </q-card-title>
            <q-card-main>
                <div>
                    <div>
                    <!-- Age Range & Sex -->
                        <div class="row gutter-lg">
                            <div class="col-xs-4 col-md-4">
                                <q-field label="Age Range"/>
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <q-input v-model="crit.minAge" type="number" align="center" min="0" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Minimum Age of participants" clearable/>
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <q-input v-model="crit.maxAge" type="number" align="center" min="0" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Maximum Age of participants" @input="checkMaxAge(crit.minAge, crit.maxAge)" clearable/>
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <q-field label="Sex" />
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <q-checkbox class="q-mr-lg" v-model="crit.gender" label="M" color="secondary" val="genderMale" />
                                <q-checkbox class="q-mr-lg" v-model="crit.gender" label="F" color="secondary" val="genderFemale" />
                                <q-checkbox v-model="crit.gender" label="OTHER" color="secondary" val="genderOther" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-main>
        </q-card>
    <!-- Disease, Lifestyle and Meds -->
        <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
                <div>
                    <div>
                        <div class="row gutter-lg">
                            <div class="col-xs-4 col-md-4">
                                <q-field label="List of Diseases" />
                            </div>
                            <div class="col-xs-4 col-md-6">
                                <q-chips-input v-model="diseasesVue" placeholder="Select from list" @duplicate="duplicatedDisease">
                                <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
                                </q-chips-input>
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <q-field label="Lifestyle" />
                            </div>
                            <div class="col-xs-4 col-md-6">
                                <q-radio v-model="crit.lifestyle" val="active" color="secondary" label="Active" />
                                <q-radio v-model="crit.lifestyle" val="notActive" color="secondary" label="Not Active" style="margin-left: 10px" />
                            </div>
                            <div class="col-xs-4 col-md-4">
                                <q-field label="List of Meds" />
                            </div>
                            <div class="col-xs-4 col-md-6">
                                <q-chips-input v-model="medsVue" placeholder="Select from list" @duplicate="duplicatedMeds">
                                <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
                                </q-chips-input>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-main>
        </q-card>
  <!-- Custom Criteria Questions -->
        <q-card class="bg-cyan-2 q-ma-xl">
          <q-card-title>Custom Criteria Question(s)
            <span slot="subtitle">Please enter additional criteria questions to filter the eligibility of the participants. The answers are yes/no.</span>
          </q-card-title>
          <q-card-main>
              <div v-for="(criteriaQuestion, index) in crit.criteriaQuestions" :key="criteriaQuestion.id">
              <q-btn class="vertical-top" v-show="index !==0" label="Remove this Question" color="negative" icon="remove" @click="removeRowCriteriaQuestion(index)" />
              <q-field label="Criteria Question:" helper="Please enter a question. (e.g. Are you a smoker?)">
                <q-input v-model="criteriaQuestion.title" type="text" clearable />
              </q-field>
              <q-field class="q-mt-md" label="Participant Answer:" helper="Please select either yes or no.">
                <q-radio class="q-mr-lg" v-model="criteriaQuestion.answer" val="yes" color="secondary" label="Yes" />
                <q-radio v-model="criteriaQuestion.answer" val="no" color="full" label="No" />
              </q-field>
              <q-btn class="float-right q-mt-sm" label="Add Question" color="primary" icon="add" @click="addRowCriteriaQuestion(index)" />
              <q-card-separator class="q-mb-md q-mt-xl"/>
            </div>
          </q-card-main>
        </q-card>
 <!-- Disease, Lifestyle and Meds -->
    <!-- <q-card class="bg-cyan-2 q-ma-xl">
      <q-card-main>
        <div>
          <div>
            <div class="row gutter-lg">
              <div class="col-xs-4 col-md-4">
                <q-field label="List of Diseases" />
              </div>
              <div class="col-xs-4 col-md-6">
                <q-chips-input v-model="diseasesVue" placeholder="Select from list" @duplicate="duplicatedDisease">
                  <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
                </q-chips-input>
              </div>
              <div class="col-xs-4 col-md-4">
                <q-field label="Lifestyle" />
              </div>
              <div class="col-xs-4 col-md-6">
                <q-radio v-model="lifestyle" val="active" color="secondary" label="Active" />
                <q-radio v-model="lifestyle" val="notActive" color="secondary" label="Not Active" style="margin-left: 10px" />
              </div>
              <div class="col-xs-4 col-md-4">
                <q-field label="List of Meds" />
              </div>
              <div class="col-xs-4 col-md-6">
                <q-chips-input v-model="medsVue" placeholder="Select from list" @duplicate="duplicatedMeds">
                  <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
                </q-chips-input>
              </div>
            </div>
          </div>
        </div>
      </q-card-main>
    </q-card> -->
  </q-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TabPaneStudyCriteria',
  props: ['criteria'],
  computed: {
    crit: {
      get () { return this.criteria },
      set (value) { this.$emit('updateCrit', value) }
    },
    diseasesVue: {
      get: function () {
        console.log('GET')
        var keys = []
        for (let key in this.criteria.diseases) {
          keys.push(key)
        }
        console.log('GET', this.criteria.diseases)
        return keys
      },
      set: function (keys) {
        for (let key in this.criteria.diseases) {
          // if key is not in keys, delete
          if (!keys.includes(key)) delete this.criteria.diseases[key]
        }
        console.log('SET', this.criteria.diseases)
      }
    },
    medsVue: {
      get: function () {
        console.log('GET')
        var keys = []
        for (let key in this.criteria.meds) {
          keys.push(key)
        }
        console.log('GET', this.criteria.meds)
        return keys
      },
      set: function (keys) {
        for (let key in this.criteria.meds) {
          // if key is not in keys, delete
          if (!keys.includes(key)) delete this.criteria.meds[key]
        }
        console.log('SET', this.criteria.meds)
      }
    }
  },
  methods: {
    checkMaxAge (minAge, maxAge) {
      if (maxAge < minAge) {
        this.$q.notify('The maximum age of the participant is less than the minimum age. Please re-enter the maximum age.')
        this.maxAge = ''
      }
    },
    searchDisease (diseaseDescription, done) {
      // Declare top level URL vars
      var baseUrl = 'http://browser.ihtsdotools.org/api/v1/snomed/'
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
        })
    },
    selectedDisease (item) {
      this.criteria.diseases[item.label] = item.conceptId
      console.log('SELECTED', this.criteria.diseases)
    },
    duplicatedDisease (label) {
      this.$q.notify(`"${label}" already in list`)
    },
    searchMeds (medDescription, done) {
      // Declare top level URL vars
      var baseUrl = 'http://browser.ihtsdotools.org/api/v1/snomed/'
      var edition = 'en-edition'
      var version = '20180131'
      // Construct Meds Query URL
      var medQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(medDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=substance' + '&returnLimit=100&normalize=true'
      this.loading = true
      axios.get(medQueryURL)
        .then((response) => {
          this.loading = false
          const dataMed = response.data
          // Filter out already selected meds
          let resMedsFiltByLen = dataMed.matches.filter(entry => entry['term'].length < 40)
          const selMeds = Object.keys(this.criteria.meds)
          var medsFil = resMedsFiltByLen.filter((entry) => !selMeds.includes(entry.term))
          if (medsFil.length === 0) {
            this.$q.notify('There are no more matching items with the current terms. Please search for other meds.')
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
          console.log(error)
          this.loading = false
        })
    },
    selectedMeds (item) {
      this.criteria.meds[item.label] = item.conceptId
      console.log('SELECTED', this.criteria.meds)
    },
    duplicatedMeds (label) {
      this.$q.notify(`"${label}" already in list`)
    },
    addRowCriteriaQuestion (index) {
      // increment the id
      this.crit.criteriaQuestions.push({
        title: '',
        answer: ''
      })
    },
    removeRowCriteriaQuestion (index) {
      this.crit.criteriaQuestions.splice(index, 1)
    }
  }
}
</script>
