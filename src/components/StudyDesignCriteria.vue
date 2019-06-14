<template>
  <div>
    <!-- Inclusion Criteria Tab Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Inclusion Criteria </div>
        <div class="text-subtitle1"> These criteria are automatically matched against participants' profiles </div>
      </q-card-section>

      <q-card-section>
        <!-- Age Range & Sex -->
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Age range: </div>
          <div class="col q-mr-sm">
            <q-input
            type="number"
            align="center" min="0"
            v-model.trim="v.minAge.$model"
            hint="Minimum age of participants."
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            @blur="v.minAge.$touch" @input="update()"
            :error="v.minAge.$error" error-message="A minimum age is required"/>
          </div>
          <div class="col q-ml-sm">
            <q-input
            type="number"
            align="center" min="0"
            v-model.trim="v.maxAge.$model"
            hint="Maximum age of participants."
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            @blur="v.maxAge.$touch" @input="update()"
            :error="v.maxAge.$error" error-message="A maximum age is required"/>
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Gender: </div>
          <div class="col">
            <q-field hint="Desired gender. More than one option can be selected."
            :error="v.gender.$error" error-message="At least one gender must be specified">
            <q-checkbox v-model="v.gender.$model" label="Male" val="male" @input="update()"/>
            <q-checkbox v-model="v.gender.$model" label="Female" val="female" @input="update()"/>
            <q-checkbox v-model="v.gender.$model" label="Other" val="other" @input="update()"/>
          </q-field>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <!-- Number of Participants -->
      <div class="row q-ma-sm">
        <div class="col-2 text-bold"> Maximum number of participants: </div>
        <div class="col">
          <q-input
          type="number"
          align="center" min="0"
          hint="Optional. Mobistudy will stop proposing this study when this number of participants  has joined this study. Withdrawals are included."
          v-model.trim="value.numberOfParticipants" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  clearable @input="update()"/>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <!-- Diseases -->
      <div class="row q-ma-sm">
        <div class="col-2 text-bold"> List of diseases: </div>
        <div class="col">
          <q-select
          v-model="diseasesVue"
          use-input
          use-chips
          multiple
          :options="diseaseOptions"
          input-debounce="500"
          @filter="searchDisease"
          hint="Type in and select the list of diseases that the patient will need to have. The disease name is searched on SNOMED."
          @input="update()" >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No diseases found
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </q-card-section>

  <q-card-section>
    <!-- Medications -->
    <div class="row q-ma-sm">
      <div class="col-2 text-bold"> List of medications: </div>
      <div class="col">
        <q-select
        v-model="medsVue"
        use-input
        use-chips
        multiple
        :options="medsOptions"
        input-debounce="500"
        @filter="searchMeds"
        hint="Type in and select the list of medications the patient has to be taking (only generics). The medication name is searched on SNOMED."
        @input="update()">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No medications found
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</q-card-section>

<!-- Lifestyle -->
<q-card-section>
  <div class="row q-ma-sm">
    <div class="col-2 text-bold"> Lifestyle: </div>
    <div class="col q-mr-sm">
      <q-field hint="Physically active">
        <q-radio v-model="value.lifestyle.active" val="yes" color="secondary" label="Active" @input="update()"/>
        <q-radio v-model="value.lifestyle.active" val="no" color="secondary" label="Not active" @input="update()"/>
        <q-radio v-model="value.lifestyle.active" val="notrequired" color="secondary" label="Not required" @input="update()"/>
      </q-field>
    </div>
    <div class="col q-ml-sm">
      <q-field hint="Smoker">
        <q-radio v-model="value.lifestyle.smoker" val="yes" color="secondary" label="Smoker" @input="update()"/>
        <q-radio v-model="value.lifestyle.smoker" val="no" color="secondary" label="Not smoker" @input="update()"/>
        <q-radio v-model="value.lifestyle.smoker" val="notrequired" color="secondary" label="Not required" @input="update()"/>
      </q-field>
    </div>
  </div>
</q-card-section>
</q-card>
<!-- Custom Criteria Questions -->
<q-card class="form-card">
  <q-card-section>
    <div class="text-h6"> Custom Criteria Questions </div>
    <div class="text-subtitle1"> Additional criteria questions </div>
  </q-card-section>
  <q-card-section>
    <div v-for="(criteriaQuestion, index) in value.criteriaQuestions" :key="index">
      <div class="row q-ma-sm">
        <div class="col-2 text-bold"> Criteria Question: </div>
        <div class="col">
          <q-input v-model="criteriaQuestion.title" type="text" hint="Additional question. Example: Are you pregnant?" @input="update()"/>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col-2 text-bold"> Answer for inclusion: </div>
        <div class="col">
          <q-field hint="This is the answer that make the patient eligible.">
            <q-radio v-model="criteriaQuestion.answer" val="yes" label="Yes" @input="update()"/>
            <q-radio v-model="criteriaQuestion.answer" val="no" label="No" @input="update()"/>
          </q-field>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col">
          <q-btn class="float-left" label="Remove Question" color="negative" icon="remove" @click="removeRowCriteriaQuestion(index)" />
          <q-btn class="float-right" v-show="index == value.criteriaQuestions.length-1" label="Add Question" color="primary" icon="add" @click="addRowCriteriaQuestion()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" v-show="index != value.criteriaQuestions.length-1"/>
    </div>
    <div class="row">
      <div class="col">
        <q-btn class="float-right" v-show="value.criteriaQuestions.length == 0" label="Add Question" color="primary" icon="add" @click="addRowCriteriaQuestion()" />
      </div>
    </div>
  </q-card-section>
</q-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StudyDesignCriteria',
  props: ['value', 'v'],
  data () {
    return {
      diseaseOptions: [],
      medsOptions: []
    }
  },
  computed: {
    // these are used to map label and value to name and conceptId
    diseasesVue: {
      get: function () {
        if (this.value.diseases && this.value.diseases.length) {
          return this.value.diseases.map(x => {
            return {
              label: x.name,
              value: x.conceptId
            }
          })
        } else return []
      },
      set: function (diseasesOpts) {
        this.value.diseases = diseasesOpts.map(x => {
          return {
            name: x.label,
            conceptId: x.value
          }
        })
      }
    },
    medsVue: {
      get: function () {
        if (this.value.medications && this.value.medications.length) {
          return this.value.medications.map(x => {
            return {
              label: x.name,
              value: x.conceptId
            }
          })
        } else return []
      },
      set: function (diseasesOpts) {
        this.value.medications = diseasesOpts.map(x => {
          return {
            name: x.label,
            conceptId: x.value
          }
        })
      }
    }
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    },
    searchDisease (diseaseDescription, update, abort) {
      if (diseaseDescription.length < 2) {
        abort()
        return
      }
      // Declare top level URL vars
      var baseUrl = 'https://browser.ihtsdotools.org/api/v1/snomed/'
      var edition = 'en-edition'
      var version = '20180131'
      // Construct Disease Query URL
      var diseaseQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(diseaseDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=disorder' + '&returnLimit=100&normalize=true'
      axios.get(diseaseQueryURL)
        .then((response) => {
          let result = response.data
          // remove very long names
          result = result.matches.filter(entry => entry.term.length < 50)
          // Filter out already-selected diseases
          if (this.value.diseases && this.value.diseases.length) {
            const alreadySelected = this.value.diseases.map(dis => dis.conceptId)
            result = result.filter(entry => !alreadySelected.includes(entry.conceptId))
          }
          if (result.length === 0) {
            abort()
          } else {
            const resultD = result.map((item) => {
              return {
                label: item.term,
                value: item.conceptId
              }
            })
            update(() => {
              this.diseaseOptions = resultD
            })
          }
        }, (error) => {
          this.$q.notify('Error while finding disease')
          console.error(error)
          abort([])
        })
    },
    searchMeds (medDescription, update, abort) {
      if (medDescription.length < 2) {
        abort()
        return
      }
      // Declare top level URL vars
      var baseUrl = 'https://browser.ihtsdotools.org/api/v1/snomed/'
      var edition = 'en-edition'
      var version = '20180131'
      // Construct medications Query URL
      var medQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(medDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=substance' + '&returnLimit=100&normalize=true'
      axios.get(medQueryURL)
        .then((response) => {
          let result = response.data
          // remove very long names
          result = result.matches.filter(entry => entry.term.length < 50)
          // Filter out already-selected diseases
          if (this.value.medications && this.value.medications.length) {
            const alreadySelected = this.value.medications.map(dis => dis.conceptId)
            result = result.filter(entry => !alreadySelected.includes(entry.conceptId))
          }
          if (result.length === 0) {
            abort()
          } else {
            const resultD = result.map((item) => {
              return {
                label: item.term,
                value: item.conceptId
              }
            })
            update(() => {
              this.medsOptions = resultD
            })
          }
        }, (error) => {
          this.$q.notify('Error while finding medication')
          console.error(error)
          abort([])
        })
    },
    addRowCriteriaQuestion () {
      this.value.criteriaQuestions.push({
        title: '',
        answer: ''
      })
      this.update()
    },
    removeRowCriteriaQuestion (index) {
      this.value.criteriaQuestions.splice(index, 1)
      this.update()
    }
  }
}
</script>
