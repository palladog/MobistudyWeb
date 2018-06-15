<template>
  <q-page>
      <q-tabs color="secondary" glossy align="justify">
        <q-tab slot="title" default name="generalities" icon="subject" label="Generalities" />
        <q-tab slot="title" name="criteria" icon="fingerprint" label="Inclusion Criteria" />
        <q-tab slot="title" name="tasks" icon="list" label="Tasks"/>
        <q-tab slot="title" name="consent" icon="verified_user" label="Consent"/>
        <q-tab slot="title" name="test" icon="verified_user" label="Test"/>
        <!-- General Tab -->
        <q-tab-pane name="generalities">Gen tab
          <!-- General Information Tab Card -->
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Generalities
              <span slot="subtitle">General information about the study</span>
            </q-card-title>
            <q-card-main>
              <q-field label="Title" helper="Short name of the study">
                <q-input v-model="text" clearable />
              </q-field>
              <q-field label="Description" helper="Layman's description of the study">
                <q-input v-model="area" type="textarea" rows="7" clearable />
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
                <q-field label="Name & Title:" helper="Principal Investigator Name & Title">
                  <q-input v-model="principalInvestigator.nameTitleOfInvestigator" type="text" clearable />
                </q-field>
                <q-field label="Contact:" helper="Contact Details, may include address">
                  <q-input v-model="principalInvestigator.contactDetailsOfInvestigator" type="textarea" rows="4" clearable />
                </q-field>
                <q-field label="Institution:" helper="Name of Institution involved in study">
                  <q-input v-model="principalInvestigator.institutionOfInvestigator" type="textarea" rows="2"  clearable />
                </q-field>
                <q-btn class="q-ml-md q-mt-lg" v-show="showRemoveButton" round size="sm" color="negative" icon="remove" @click="removeRowInvestigator(index)" />
                <q-btn class="float-right q-mt-lg" round size="sm" color="primary" icon="add" @click="addRowInvestigator(index)" />
                <q-card-separator class="q-mb-md q-mt-md"/>
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
                <q-field label="Name of Institution:" helper="Please enter the name of the institution">
                  <q-input v-model="institution.nameOfInstitution" type="text" clearable />
                </q-field>
                <q-field label="Contact:" helper="Contact Details of the institution, may include address">
                  <q-input v-model="institution.contactOfInstitution" type="textarea" rows="4" clearable />
                </q-field>
                <q-field class="q-mt-md" label="Data Access:" helper="Data access per institution. Please select the level of access to grant or not.">
                  <q-radio v-model="institution.radioDataAccessInstitution" val="no" color="secondary" label="NO" />
                  <q-radio v-model="institution.radioDataAccessInstitution" val="anon" color="anon" label="ANON" />
                  <q-radio v-model="institution.radioDataAccessInstitution" val="full" color="full" label="FULL" />
                </q-field>
                <q-btn class="q-ml-md q-mt-lg" v-show="showRemoveButton" round size="sm" color="negative" icon="remove" @click="removeRowInstitution(index)" />
                <q-btn class="float-right q-mt-lg" round size="sm" color="primary" icon="add" @click="addRowInstitution(index)" />
                <q-card-separator class="q-mb-md q-mt-md"/>
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
                          <q-datetime class="q-ml-xl q-mb-lg" v-model="dateStart" type="date" format="D-MMM-YYYY" clearable />
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
                          <q-datetime class="q-ml-xl" v-model="dateEnd" type="date" format="D-MMM-YYYY" clearable />
                        </div>
                    </div>
                  </div>
              </div>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Criteria Tab -->
        <q-tab-pane name="criteria">Crit tab
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
                        <q-input v-model="ageMin" type="number" placeholder="Min Age1" clearable/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <q-input v-model="ageMax" type="number" placeholder="Max Age1" clearable/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Sex" />
                    </div>
                    <div class="col-xs-4 col-md-4">
                      <q-checkbox class="q-mr-lg" v-model="checkArrayAge" label="M" color="secondary" val="one" />
                      <q-checkbox class="q-mr-lg" v-model="checkArrayAge" label="F" val="two" color="secondary" />
                      <q-checkbox v-model="checkArrayAge" label="OTHER" val="three" color="secondary" />
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
                      <q-radio v-model="radio_lifestyle" val="not active" color="amber" label="Not Active" style="margin-left: 10px" />
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
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-main>
              <div>
                <div>
                  <!-- Custom Criteria Questions -->
                  <div class="row gutter-lg">
                    <div class="col-xs-4 col-md-4">
                      <q-field label="Custom Criteria:" />
                    </div>
                    <div class="col-xs-4 col-md-6">
                      <q-input type="text" id="disease-form" placeholder="Question Example:" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <!-- Tasks Tab -->
        <q-tab-pane name="tasks">Tasks tab
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
        <q-tab-pane name="consent">Consent tab
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>
              Consent
              <span slot="subtitle">Consent form that is viewed by participant</span>
            </q-card-title>
            <!-- Consent Tab: Invitation Message Card -->
            <q-card-main>
              <q-field label="Invitation Message" helper="The invitation message sent for the study">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
              <q-field label="Lay Description" helper="Layman's description of the study">
                <q-input v-model="area" readonly type="textarea" rows="7"/>
              </q-field>
              <p class="caption">Consent Question:</p>
              <q-checkbox v-model="check1" color="positive" label="Dynamic" left-label />
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

// var globalGridRowId = 0

export default {
  data () {
    return {
      showRemoveButton: true,
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
      checkArrayAge: ['one'],
      radio_lifestyle: 'Active',
      inputs: ['one'],
      showDataQuery: true,
      selectDataTypeForQuery: [],
      selectOptionsDataTypeForQuery: [
        { label: 'Steps', value: 'valSteps', color: 'black' },
        { label: 'Weight', value: 'valWeight', color: 'secondary' }
      ]
    }
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
