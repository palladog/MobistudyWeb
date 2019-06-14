<template>
  <div>
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Generalities </div>
        <div class="text-subtitle1"> General information about the study </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Title </div>
          <div class="col">
            <q-input v-model.trim="v.title.$model" @blur="v.title.$touch" @input="update()" hint="Short name of the study" :error="v.title.$error" error-message="A title is required"/>
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Short description </div>
          <div class="col">
            <q-input v-model.trim="v.shortDescription.$model" @blur="v.shortDescription.$touch" @input="update()"
            hint="Describe the study in one brief sentence. This appears with the notification inviting the participant to check the study. Make it appealing!"
            :error="v.shortDescription.$error" error-message="A description is required"/>
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Long description </div>
          <div class="col">
            <q-input type="textarea" rows="3"
            hint="A longer description (few sentences) of the study, in layman terms. This is shown when the participant wants to know more about the study."
            v-model.trim="v.longDescription.$model" @blur="v.longDescription.$touch" @input="update()"
            :error="v.longDescription.$error" error-message="A description is required"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
<!-- Gen Info Tab: Principal Investigator Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Principal Investigator(s) </div>
        <div class="text-subtitle1"> Principal investigators of this study: </div>
      </q-card-section>
      <q-card-section>
        <div v-for="(pi, index) in v.principalInvestigators.$each.$iter" :key="index">
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Name &amp; Title: </div>
            <div class="col">
              <q-input type="text"
              hint="Principal Investigator name &amp; title."
              v-model.trim="pi.name.$model" @blur="pi.name.$touch" @input="update()"
              :error="pi.name.$error" error-message="Name and title are required"/>
            </div>
          </div>
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Contact: </div>
            <div class="col">
              <q-input type="textarea" rows="4"
              hint="Contact details, like email, telephone and address."
              v-model.trim="pi.contact.$model" @blur="pi.contact.$touch" @input="update()"
              :error="pi.contact.$error" error-message="A contact is required"/>
            </div>
          </div>
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Institution: </div>
            <div class="col">
              <q-input type="text"
              hint="Name of institution the PI belongs to. The institution must be also present in the list of Institutions below."
              v-model.trim="pi.institution.$model" @blur="pi.institution.$touch" @input="update()"
              :error="pi.institution.$error" error-message="An institution is required."/>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn v-show="index !=0" label="Remove PI" color="negative" icon="remove" @click="removeRowInvestigator(index)"/>
            </div>
            <div class="col">
              <q-btn class="float-right" v-show="index == value.principalInvestigators.length-1" label="Add PI" color="primary" icon="add" @click="addRowInvestigator(index)"/>
            </div>
          </div>
          <q-separator v-show="index != value.principalInvestigators.length-1"/>
        </div>
      </q-card-section>
    </q-card>
<!-- Gen Info Tab: Institutions Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Institution(s) </div>
        <div class="text-subtitle1"> Involved institutions and data access rules: </div>
      </q-card-section>
      <q-card-section>
        <div v-for="(inst, index) in v.institutions.$each.$iter" :key="index">
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Name of the Institution: </div>
            <div class="col">
              <q-input type="text"
              hint="Full name of the involved instituion."
              v-model.trim="inst.name.$model" @blur="inst.name.$touch" @input="update()"
              :error="inst.name.$error" error-message="A name is required."/>
            </div>
          </div>
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Contact: </div>
            <div class="col">
              <q-input type="textarea" rows="4"
              hint="Official contact details of the institution, like an email or and address."
              v-model.trim="inst.contact.$model" @blur="inst.contact.$touch" @input="update()"
              :error="inst.contact.$error" error-message="Contact details are required"/>
            </div>
          </div>
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Data Access: </div>
            <div class="col">
              <q-field class="q-mt-md" label="Data Access:" hint="Level of data access granted to this instituion."
              :error="inst.dataAccess.$error" error-message="The level of data access is required">
                <q-radio v-model.trim="inst.dataAccess.$model" val="no" color="secondary" label="No" @input="update()"/>
                <q-radio v-model.trim="inst.dataAccess.$model" val="anonymised" color="secondary" label="Anonymised" @input="update()" style="margin-left: 10px"/>
                <q-radio v-model.trim="inst.dataAccess.$model" val="full" color="secondary" label="Full" @input="update()" style="margin-left: 10px"/>
              </q-field>
            </div>
          </div>
          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Reason for Data Access: </div>
            <div class="col">
              <q-input type="textarea" rows="2"
              hint="Provide a brief justification of why this level of data access has to be granted."
              :readonly="inst.dataAccess.$model === 'no'"
              v-model.trim="inst.reasonForDataAccess.$model" @blur="inst.reasonForDataAccess.$touch" @input="update()"
              :error="inst.reasonForDataAccess.$error" error-message="A reason must be provided"/>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col">
              <q-btn v-show="index !=0" label="Remove Institution" color="negative" icon="remove" @click="removeRowInstitution(index)" />
            </div>
            <div class="col">
              <q-btn class="float-right" v-show="index == value.institutions.length-1" label="Add Institution" color="primary" icon="add" @click="addRowInstitution(index)" />
            </div>
          </div>
          <q-separator v-show="index != value.institutions.length-1"/>
        </div>
      </q-card-section>
    </q-card>
<!-- Gen Info Tab: Date Card -->
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Dates: </div>
        <div class="text-subtitle1"> The start and end dates of the study: </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Start date: </div>
          <div class="col">
            <q-input type="date" format="D-MMM-YYYY"
            hint="Date the study officially starts."
            v-model.trim="v.startDate.$model" @blur="v.startDate.$touch" @input="update()"
            :error="v.startDate.$error" error-message="A date is required"/>
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> End date: </div>
          <div class="col">
            <q-input type="date" format="D-MMM-YYYY"
            hint="Date the study officially ends. No data collection is possible after this date."
            v-model.trim="v.endDate.$model" @blur="v.endDate.$touch" @input="update()"
            :error="v.endDate.$error" error-message="A date is required"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'StudyDesignGeneralities',
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
    }
  }
}
</script>
