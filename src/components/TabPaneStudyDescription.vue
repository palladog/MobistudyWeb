<template>
  <q-tab-pane name="tab-study-description">
      {{ studyDesign }}
    <q-card class="form-card">
      <q-card-title> {{ studyDesign.generalities.title }} </q-card-title>
        <q-card-main>
            <q-field label="Description:"> {{ studyDesign.generalities.longDescription }} </q-field>
            <q-field label="Start Date of Study:"> {{ niceDate(studyDesign.generalities.startDate) }} </q-field>
            <q-field label="End Date of Study:"> {{ niceDate(studyDesign.generalities.endDate) }} </q-field>
            <q-card-separator/>
            <q-field label="Created on:"> {{ niceDate(studyDesign.createdTS) }} </q-field>
            <q-field label="Published on:"> {{ niceDate(studyDesign.publishedTS) }} </q-field>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Principal Investigators: </q-card-title>
        <q-card-main>
            <div v-for="(pi, pIndex) in studyDesign.generalities.principalInvestigators" :key="pIndex">
                <q-field label="P.I. Name &amp; Title:">
                    <!-- <q-input v-model="pi.name" type="text" readonly/> -->
                    {{ pi.name }}
                </q-field>
                <q-field label="Contact Details:">
                    <!-- <q-input v-model="pi.contact" type="textarea" readonly/> -->
                    {{ pi.contact }}
                </q-field>
                <q-field label="Institution:">
                    <!-- <q-input v-model="pi.institution" type="text" readonly/> -->
                    {{ pi.institution }}
                </q-field>
                <q-card-separator v-show="pIndex != studyDesign.generalities.principalInvestigators.length-1"/>
            </div>
         </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Institutions: </q-card-title>
        <q-card-main>
            <div v-for="(inst, inIndex) in studyDesign.generalities.institutions" :key="inIndex">
                <q-field label="Name of Institution:">
                    <!-- <q-input v-model="inst.name" type="text" readonly/> -->
                    {{ inst.name }}
                </q-field>
                <!-- <q-field label="Contact Details:">
                    <q-input v-model="inst.contact" type="textarea" rows="4" readonly/>
                    {{ inst.contact }}
                </q-field> -->
                <q-field class="q-mt-md" label="Data Access:">
                    <!-- <q-input v-model="inst.dataAccess" type="text" readonly/> -->
                    {{ inst.dataAccess}}
                </q-field>
                <q-field label="Reason for Data Access:">
                    <!-- <q-input v-model="inst.reasonForDataAccess" type="textarea" rows="2" readonly/> -->
                    {{ inst.reasonForDataAccess }}
                </q-field>
                <q-card-separator v-show="inIndex != studyDesign.generalities.institutions.length-1"/>
            </div>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Inclusion Criteria: </q-card-title>
        <q-card-main>
            <div>
                <q-field label="Age range:">
                    <q-input v-model="ageLabel" type="textarea" rows=2 readonly/>
                    {{ ageLabel }}
                </q-field>
            </div>
            <q-field label="Gender:" >
                <q-input class="q-mr-lg" v-model="genderLabel" readonly/>
                {{ genderLabel }}
            </q-field>
            <q-field label="Number Of Participants:" > {{ studyDesign.inclusionCriteria.numberOfParticipants }} </q-field>
            <q-field label="Diseases:" >
                <q-input class="q-mr-lg" v-model="diseasesLabel" readonly/>
                {{ diseasesLabel }}
            </q-field>
            <q-field label="Medications:" >
                <q-input class="q-mr-lg" v-model="medsLabel" readonly/>
                {{ medsLabel }}
            </q-field>
            <q-field label="Lifestyle:" >
                <q-input class="q-mr-lg" v-model="lifeLabel" readonly/>
                {{ lifeLabel }}
            </q-field>
            <div class="q-pa-lg q-mt-sm shadow-1 bg-green-1"> Criteria Questions:
                <div v-for="(qu, qIndex) in studyDesign.inclusionCriteria.criteriaQuestions" :key="qIndex">
                    <q-field label="Question:">
                        <!-- <q-input v-model="qu.title" type="text" readonly/> -->
                        {{ qu.title }}
                    </q-field>
                    <q-field label="Answer:">
                        <!-- <q-input v-model="qu.answer" type="text" readonly/> -->
                        {{ qu.answer }}
                    </q-field>
                   <q-card-separator v-show="qIndex != studyDesign.inclusionCriteria.criteriaQuestions.length-1"/>
                </div>
            </div>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Tasks: </q-card-title>
        <q-card-main>
            <q-field label="Tasks:"> </q-field>
            <q-field label="Forms:"> </q-field>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Consent: </q-card-title>
        <q-card-main>
            <q-field label="Invitation:"> {{ studyDesign.consent.invitation }} </q-field>
            <q-field label="Privacy Policy:"> {{ studyDesign.consent.privacyPolicy }} </q-field>
        </q-card-main>
    </q-card>

  </q-tab-pane>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'TabPaneStudyDescription',
  props: ['studyDesign'],
  data () {
    return {
      ageLabel: '',
      genderLabel: '',
      studyObj: '',
      diseasesLabel: '',
      medsLabel: '',
      lifeLabel: ''
    }
  },
  mounted () {
    console.log('STD DES : +++ ', this.studyDesign._key)
    this.ageRangeLabel()
    this.genderStr()
    this.diseasesStr()
    this.medsStr()
    this.lifeStyleStr()
  },
  methods: {
    niceDate (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
    },
    ageRangeLabel () {
      let str = 'From '
      if (this.studyDesign.inclusionCriteria.minAge !== undefined) {
        str += 'a minimum Age of ' + this.studyDesign.inclusionCriteria.minAge + ' '
      }
      if (this.studyDesign.inclusionCriteria.maxAge !== undefined) {
        str += 'to a maximum Age of ' + this.studyDesign.inclusionCriteria.minAge
      }
      if (this.studyDesign.inclusionCriteria.minAge === undefined && this.studyDesign.inclusionCriteria.maxAge === undefined) {
        str = ''
      }
      this.ageLabel = str
    },
    genderStr () {
      let gender = this.studyDesign.inclusionCriteria.gender
      let str = ''
      for (let i = 0; i < gender.length; i++) {
        str += gender[i]
        if (gender.length > 1 && i !== (gender.length - 1)) str += ', '
      }
      this.genderLabel = str
    },
    diseasesStr () {
      let diseases = this.studyDesign.inclusionCriteria.diseases
      let str = ''
      for (let i = 0; i < diseases.length; i++) {
        str += diseases[i].name
        if (diseases.length > 1 && i !== (diseases.length - 1)) str += ', '
      }
      this.diseasesLabel = str
    },
    medsStr () {
      let meds = this.studyDesign.inclusionCriteria.medications
      let str = ''
      for (let i = 0; i < meds.length; i++) {
        str += meds[i].name
        if (meds.length > 1 && i !== (meds.length - 1)) str += ', '
      }
      this.medsLabel = str
    },
    lifeStyleStr () {
      let life = this.studyDesign.inclusionCriteria.lifestyle
      let str = 'Active: ' + life.active + ' & Smoker: ' + life.smoker
      this.lifeLabel = str
    }
  }
}
</script>
