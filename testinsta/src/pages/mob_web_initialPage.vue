<template>
  <q-page>
      <q-tabs color="secondary" glossy align="justify">
        <q-tab slot="title" default name="generalities" icon="subject" label="Generalities" />
        <q-tab slot="title" name="criteria" icon="fingerprint" label="Inclusion Criteria" />
        <q-tab slot="title" name="tasks" icon="list" label="Tasks"/>
        <q-tab slot="title" name="consent" icon="verified_user" label="Consent"/>
        <q-tab slot="title" name="test" icon="verified_user" label="Test"/>
        <!-- General Tab -->
        <q-tab-pane name="generalities">
          <!-- General Information Tab Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Generalities
              <span slot="subtitle">General information about the study</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Title" helper="Short name of the study">
               <q-input v-model="studyTitle" @input="$v.studyTitle.$touch()" clearable />
                <div v-if="$v.studyTitle.$dirty">
                  <p v-if="!$v.studyTitle.required" class="q-mt-sm text-negative"> A title is required for the study. Please enter it.</p>
                </div>
              </q-field>
              <q-field label="Description" helper="Layman's description of the study">
                <q-input v-model="studyDescription" @input="$v.studyDescription.$touch()" type="textarea" rows="7" clearable />
                 <div v-if="$v.studyDescription.$dirty">
                  <p v-if="!$v.studyDescription.required" class="q-mt-sm text-negative">A description is required for the study. Please enter it.</p>
                 </div>
              </q-field>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Principal Investigator Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Principal Investigator(s)
              <span slot="subtitle">Information concerning the principal investigators:</span>
            </q-card-title>
            <q-card-main>
              <div v-for="(principalInvestigator, index) in principalInvestigators" :key="principalInvestigator.id">
                <div>
                  <q-btn class="vertical-top" v-show="index !==0" round size="sm" color="negative" icon="remove" @click="removeRowInvestigator(index)" />
                </div>
                <q-field label="Name & Title:" helper="Principal Investigator Name & Title">
                  <q-input v-model="principalInvestigator.nameTitleOfInvestigator" type="text" clearable />
                </q-field>
                <q-field label="Contact:" helper="Contact Details, may include address">
                  <q-input v-model="principalInvestigator.contactDetailsOfInvestigator" type="textarea" rows="4" clearable />
                </q-field>
                <q-field label="Institution:" helper="Name of Institution involved in study">
                  <q-input v-model="principalInvestigator.institutionOfInvestigator" type="textarea" rows="2"  clearable />
                </q-field>
                <q-btn class="float-right q-mt-sm" round size="sm" color="primary" icon="add" @click="addRowInvestigator(index)" />
                <q-card-separator class="q-mb-md q-mt-xl"/>
              </div>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Institutions Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Institution(s)
              <span slot="subtitle">Institutions that the data might or might not be shared with:</span>
            </q-card-title>
            <q-card-main>
              <div v-for="(institution, index) in institutions" :key="institution.id">
                <q-btn class="vertical-top" v-show="index !==0" round size="sm" color="negative" icon="remove" @click="removeRowInstitution(index)" />
                <q-field label="Name of Institution:" helper="Please enter the name of the institution">
                  <q-input v-model="institution.nameOfInstitution" type="text" clearable />
                </q-field>
                <q-field label="Contact:" helper="Contact Details of the institution, may include address">
                  <q-input v-model="institution.contactOfInstitution" type="textarea" rows="4" clearable />
                </q-field>
                <q-field class="q-mt-md" label="Data Access:" helper="Data access per institution. Please select the level of access to grant or not.">
                  <q-radio v-model="institution.radioDataAccessInstitution" val="no" color="secondary" label="NO" />
                  <q-radio class="q-ml-md q-mr-md" v-model="institution.radioDataAccessInstitution" val="anon" color="anon" label="ANON" />
                  <q-radio v-model="institution.radioDataAccessInstitution" val="full" color="full" label="FULL" />
                </q-field>
                <q-btn class="float-right q-mt-sm" round size="sm" color="primary" icon="add" @click="addRowInstitution(index)" />
                <q-card-separator class="q-mb-md q-mt-xl"/>
              </div>
            </q-card-main>
          </q-card>
          <!-- Gen Info Tab: Date Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Dates Of Study
              <span slot="subtitle">The Start and End Dates of the study</span>
            </q-card-title>
            <q-card-main>
              <div>
                <div>
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                        <q-field label="Start Date" />
                        </div>
                        <div class="col-xs-4 col-md-4">
                          <q-datetime class="q-ml-xl q-mb-lg" v-model="dateStart" @input="$v.dateStart.$touch()" type="date" format="D-MMM-YYYY" clearable />
                          <div v-if="$v.dateStart.$dirty">
                            <p v-if="!$v.dateStart.required" class="q-mt-sm text-negative">The Start Date is required. Please enter it.</p>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
              <div>
                <div>
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                        <q-field label="End Date" />
                        </div>
                        <div class="col-xs-4 col-md-4">
                          <q-datetime class="q-ml-xl" v-model="dateEnd" type="date" @input="checkEndDate(dateStart, dateEnd)" format="D-MMM-YYYY" clearable />
                        </div>
                    </div>
                  </div>
              </div>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Criteria Tab -->
        <q-tab-pane name="criteria">
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
                        <q-input v-model="ageRangeMin" type="number" min="0" oninput="validity.valid||(value='')" placeholder="Minimum Age of participants" clearable/>
                         <div v-if="!$v.ageRangeMin.between" class="q-mt-sm text-negative"> The age is between 0 and 140.</div>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <q-input v-model="ageRangeMax" type="number" min="0" oninput="validity.valid||(value='')" placeholder="Maximum Age of participants" @input="checkMaxAge(ageRangeMin, ageRangeMax)" clearable/>
                          <div v-if="!$v.ageRangeMax.between" class="q-mt-sm text-negative"> The age is between 0 and 140.</div>
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Sex" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-checkbox class="q-mr-lg" v-model="checkArrayGender" label="M" color="secondary" val="genderMale" />
                      <q-checkbox class="q-mr-lg" v-model="checkArrayGender" label="F" color="secondary" val="genderFemale" />
                      <q-checkbox v-model="checkArrayGender" label="OTHER" color="secondary" val="genderOther" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
              <div>
                <div>
                  <!-- Disease, Lifestyle and Meds -->
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Disease Choice" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-input type="text" id="disease-form" placeholder="Disease" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Lifestyle" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-radio v-model="radio_lifestyle" val="active" color="secondary" label="Active" />
                      <q-radio v-model="radio_lifestyle" val="notActive" color="secondary" label="Not Active" style="margin-left: 10px" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Meds" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-input type="text" id="meds-form" placeholder="Meds" />
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
                 <div v-for="(criteriaQuestion, index) in criteriaQuestions" :key="criteriaQuestion.id">
                <q-btn class="vertical-top" v-show="index !==0" round size="sm" color="negative" icon="remove" @click="removeRowCriteriaQuestion(index)" />
                <q-field label="Criteria Question:" helper="Please enter a question. (e.g. Are you a smoker?)">
                  <q-input v-model="criteriaQuestion.titleOfCriteriaQuestion" type="text" clearable />
                </q-field>
                <q-field class="q-mt-md" label="Participant Answer:" helper="Please select either yes or no.">
                  <q-radio class="q-mr-lg" v-model="criteriaQuestion.criteriaQAnswer" val="yes" color="secondary" label="Yes" />
                  <q-radio v-model="criteriaQuestion.criteriaQAnswer" val="no" color="full" label="No" />
                </q-field>
                <q-btn class="float-right q-mt-sm" round size="sm" color="primary" icon="add" @click="addRowCriteriaQuestion(index)" />
                <q-card-separator class="q-mb-md q-mt-xl"/>
              </div>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Tasks Tab -->
        <q-tab-pane name="tasks">
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>
              <q-btn-dropdown label="Add a task" class="q-ma-md">
                <q-list link>
                  <q-item @click.native="selectedForm">
                    <q-item-main>
                      <q-item-tile label>Form</q-item-tile>
                    </q-item-main>
                  </q-item>
                  <q-item @click.native='selectedDataQuery'>
                    <q-item-main>
                      <q-item-tile label>Data query</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-card-title>
          </q-card>
            <q-card class="bg-cyan-2 q-ma-xl" v-show="showDataQuery">
              <q-card-title style="width: 300px; max-width: 90vw;">
              <q-select
                  color="secondary"
                  v-model="selectDataTypeForQuery"
                  @input="selectedDataType"
                  :options="selectOptionsDataTypeForQuery"
                />
              </q-card-title>
              <q-card-main>
              </q-card-main>
            </q-card>
        </q-tab-pane>
        <!-- Consent Tab -->
        <q-tab-pane name="consent">
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>
              Consent
              <span slot="subtitle">Consent form that is viewed by participant</span>
            </q-card-title>
            <!-- Consent Tab: Invitation Message Card -->
            <q-card-main>
              <q-field label="Invitation Message" helper="The invitation message sent for the study">
                <q-input v-model="consentInvitationMessage" type="textarea" rows="7"/>
              </q-field>
              <q-field label="Lay Description" helper="Layman's description of the study">
                <q-input v-model="consentLayDescription" type="textarea" rows="7"/>
              </q-field>
              <p class="caption">Consent Question:</p>
              <q-checkbox v-model="dynamicConsentCheck" color="positive" label="Dynamic" left-label />
            </q-card-main>
          </q-card>
          <!-- Consent Tab: Privacy Policy Card -->
          <q-card class="bg-amber-3 q-ma-xl">
            <q-card-title>
              Privacy Policy
              <span slot="subtitle">Privacy form that is viewed by participant.</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Privacy Message" helper="This the privacy policy for the study. It includes...">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
            </q-card-main>
          </q-card>
        </q-tab-pane>
                <!-- TESTING Tab -->
        <q-tab-pane name="test">Test tab
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
            </q-card-main>
          </q-card>
        </q-tab-pane>
      </q-tabs>
  </q-page>
</template>

<script>
import { required, between } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      studyTitle: '',
      studyDescription: '',
      dateStart: null,
      dateEnd: null,
      principalInvestigators: [
        {
          nameTitleOfInvestigator: '',
          contactDetailsOfInvestigator: '',
          institutionOfInvestigator: ''
        }
      ],
      institutions: [
        {
          nameOfInstitution: '',
          contactOfInstitution: '',
          radioDataAccessInstitution: ''
        }
      ],
      ageMin: null,
      ageMax: null,
      checkArrayGender: ['genderMale'],
      radio_lifestyle: 'Active',
      criteriaQuestions: [
        {
          titleOfCriteriaQuestion: '',
          criteriaQAnswer: ''
        }
      ],
      inputs: ['one'],
      showDataQuery: true,
      selectDataTypeForQuery: [],
      selectOptionsDataTypeForQuery: [
        { label: 'Steps', value: 'valSteps', color: 'black' },
        { label: 'Weight', value: 'valWeight', color: 'secondary' }
      ],
      consentInvitationMessage: '',
      consentLayDescription: ''
    }
  },
  validations: {
    studyTitle: { required },
    studyDescription: { required },
    dateStart: { required },
    ageRangeMin: { between: between(0, 140) },
    ageRangeMax: { between: between(0, 140) }
  },
  methods: {
    showNotification () {
      this.$q.notify('Option selected')
    },
    addRowInvestigator (index) {
      // increment the id
      this.principalInvestigators.push({
        nameTitleOfInvestigator: '',
        contactDetailsOfInvestigator: '',
        institutionOfInvestigator: ''
      })
    },
    removeRowInvestigator (index) {
      this.principalInvestigators.splice(index, 1)
    },
    addRowInstitution (index) {
      // increment the id
      this.institutions.push({
        nameOfInstitution: '',
        contactOfInstitution: '',
        radioDataAccessInstitution: ''
      })
    },
    removeRowInstitution (index) {
      this.institutions.splice(index, 1)
    },
    addRowCriteriaQuestion (index) {
      // increment the id
      this.criteriaQuestions.push({
        criteriaQuestion: ''
      })
    },
    removeRowCriteriaQuestion (index) {
      this.criteriaQuestions.splice(index, 1)
    },
    checkEndDate (dateStart, dateEnd) {
      if (Date.parse(dateStart) > Date.parse(dateEnd)) {
        this.$q.notify('The End Date of the study is before the Start Date. Please re-enter the End Date.')
        this.dateEnd = ''
      }
    },
    checkMaxAge (ageRangeMin, ageRangeMax) {
      if (ageRangeMax < ageRangeMin) {
        this.$q.notify('The maximum age of the participant is less than the minimum age. Please re-enter the maximum age.')
        this.ageRangeMax = ''
      }
    },
    selectedDataQuery () {
      this.$q.notify('selectedData Query')
    },
    selectedForm () {
      this.$q.notify('selectedData Form')
    },
    selectedDataType (value) {
      this.$q.notify('selectedDataType: ' + value)
    }
  }
}
</script>

<style>
</style>
