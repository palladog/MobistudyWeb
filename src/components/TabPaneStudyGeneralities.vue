<template>
  <q-tab-pane name="tab-gen">
    <q-card class="form-card">
      <q-card-title>Generalities
        <span slot="subtitle">General information about the study</span>
      </q-card-title>
      <q-card-main>
        <q-field label="Title" helper="Short name of the study" :error="v.title.$error" error-label="A title is required.">
          <q-input v-model="value.title" clearable @blur="v.title.$touch" @input="update()"/>
        </q-field>
        <q-field label="Description" helper="Layman's description of the study">
          <q-input v-model="value.description" type="textarea" rows="7" clearable @input="update()"/>
        </q-field>
      </q-card-main>
    </q-card>
<!-- Gen Info Tab: Principal Investigator Card -->
    <q-card class="form-card">
      <q-card-title>Principal Investigator(s)
        <span slot="subtitle">Information concerning the principal investigators:</span>
      </q-card-title>
      <q-card-main>
        <div v-for="(pi, index) in v.principalInvestigators.$each.$iter" :key="index">
          <q-field label="Name &amp; Title:" helper="Principal Investigator Name &amp; Title" :error="pi.name.$error" error-label="A title is required.">
            <q-input v-model.trim="pi.name.$model" type="text" clearable @blur="pi.name.$touch" @input="update()"/>
          </q-field>
          <q-field label="Contact:" helper="Contact Details, may include address" :error="pi.contact.$error" error-label="A contact is required.">
            <q-input v-model.trim="pi.contact.$model" type="textarea" rows="4" clearable @blur="pi.contact.$touch" @input="update()"/>
          </q-field>
          <q-field label="Institution:" helper="Name of Institution involved in study" :error="pi.institution.$error" error-label="An institution is required.">
            <q-input v-model.trim="pi.institution.$model" type="text" clearable @blur="pi.institution.$touch" @input="update()"/>
          </q-field>
          <div class="row justify-center">
            <div class="col">
              <q-btn v-show="index !==0" label="Remove this Principal Investigator" color="negative" icon="remove" @click="removeRowInvestigator(index)"/>
            </div>
            <div class="col">
              <q-btn v-show="index == value.principalInvestigators.length-1" label="Add Principal Investigator" color="primary" icon="add" @click="addRowInvestigator(index)"/>
            </div>
          </div>
          <q-card-separator v-show="index != value.principalInvestigators.length-1"/>
        </div>
      </q-card-main>
    </q-card>
<!-- Gen Info Tab: Institutions Card -->
    <q-card class="form-card">
      <q-card-title>Institution(s)
        <span slot="subtitle">Involved institutions and data access rules:</span>
      </q-card-title>
      <q-card-main>
        <div v-for="(institution, index) in value.institutions" :key="index">
          <q-field label="Name of Institution:" helper="Please enter the name of the institution">
            <q-input v-model="institution.name" type="text" clearable @input="update()"/>
          </q-field>
          <q-field label="Contact:" helper="Contact Details of the institution, may include address">
            <q-input v-model="institution.contact" type="textarea" rows="4" clearable @input="update()"/>
          </q-field>
          <q-field class="q-mt-md" label="Data Access:" helper="Data access per institution. Please select the level of access to grant or not." @input="update()">
            <q-radio v-model="institution.dataAccess" val="no" color="secondary" label="No" @input="update()"/>
            <q-radio class="q-ml-md q-mr-md" v-model="institution.dataAccess" val="anonymised" color="secondary" label="Anonymised" @input="update()"/>
            <q-radio v-model="institution.dataAccess" val="full" color="secondary" label="Full" @input="update()"/>
          </q-field>
          <div class="row justify-center">
            <div class="col">
              <q-btn v-show="index !==0" label="Remove this Institution" color="negative" icon="remove" @click="removeRowInstitution(index)" />
            </div>
            <div class="col">
              <q-btn v-show="index == value.institutions.length-1" label="Add Institution" color="primary" icon="add" @click="addRowInstitution(index)" />
            </div>
          </div>

          <q-card-separator v-show="index != value.institutions.length-1"/>
        </div>
      </q-card-main>
    </q-card>
<!-- Gen Info Tab: Date Card -->
    <q-card class="form-card">
      <q-card-title>Dates Of Study
        <span slot="subtitle">The Start and End Dates of the study:</span>
      </q-card-title>
      <q-card-main>
        <q-field label="Start date:" helper="Starting date of the study">
          <q-datetime class="q-ml-xl q-mb-lg" v-model="value.startDate" type="date" format="D-MMM-YYYY" clearable @input="update()"/>
        </q-field>
        <q-field label="End date:" helper="Ending date of the study">
          <q-datetime class="q-ml-xl" v-model="value.endDate" type="date"  @input="checkEndDate(value.startDate, value.endDate)" format="D-MMM-YYYY" clearable />
        </q-field>
      </q-card-main>
    </q-card>
  </q-tab-pane>
</template>

<script>

export default {
  name: 'TabPaneStudyGeneralities',
  props: ['value', 'v'],
  methods: {
    update () {
      this.$emit('input', this.value)
    },
    addRowInvestigator (index) {
      // increment the id
      this.value.principalInvestigators.push({
        name: '',
        contact: '',
        institution: ''
      })
    },
    removeRowInvestigator (index) {
      this.value.principalInvestigators.splice(index, 1)
    },
    addRowInstitution (index) {
      // increment the id
      this.value.institutions.push({
        name: '',
        contact: '',
        dataAccess: ''
      })
    },
    removeRowInstitution (index) {
      this.value.institutions.splice(index, 1)
    },
    checkEndDate (dateStart, dateEnd) {
      if (Date.parse(dateStart) > Date.parse(dateEnd)) {
        this.$q.notify('The End Date of the study is before the Start Date. Please re-enter the End Date.')
        this.value.endDate = ''
      }
    }
  }
}
</script>
