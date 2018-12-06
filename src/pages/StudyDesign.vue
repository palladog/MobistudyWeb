<template>
  <q-page>
    <q-toolbar color="secondary">
      <q-toolbar-title>
        Study Designer
      </q-toolbar-title>
      <q-btn class="q-mr-md" v-show="!this.studyDesign.publishedTS" size="md" color="warning" label="Save Draft" @click="saveProgress()"/>
      <q-btn class="float-right q-mr-md" v-show="!this.studyDesign.publishedTS" color="negative" label="Publish" @click="publish()"/>
      <q-btn class="float-right q-mr-md" v-show="this.studyDesign.publishedTS" color="blue" label="Published"/>
      <q-btn  class="float-right q-mr-md" round color="black" icon="close" @click="exitDesigner"/>
    </q-toolbar>

    <q-tabs color="secondary">
      <q-tab default slot="title" name="tab-gen" icon="subject" label="Generalities" :color="$v.studyDesign.generalities.$error? 'negative': ''"/>
      <q-tab slot="title" name="tab-crit" icon="fingerprint" label="Inclusion Criteria"/>
      <q-tab slot="title" name="tab-tasks" icon="list" label="Tasks"/>
      <q-tab slot="title" name="tab-consent" icon="verified_user" label="Consent" :color="$v.studyDesign.consent.$error? 'negative': ''"/>

      <tab-pane-study-generalities name="tab-gen" v-model="studyDesign.generalities" :v="$v.studyDesign.generalities"></tab-pane-study-generalities>
      <tab-pane-study-criteria name="tab-crit" :criteria="studyDesign.inclusionCriteria" :v="$v.studyDesign.inclusionCriteria" ></tab-pane-study-criteria>
      <tab-pane-study-tasks name="tab-tasks" :tasks="studyDesign.tasks" :v="$v.studyDesign.tasks" ></tab-pane-study-tasks>
      <tab-pane-study-consent name="tab-consent" :consent="studyDesign.consent" :tasks="studyDesign.tasks" :v="$v.studyDesign.consent" ></tab-pane-study-consent>
    </q-tabs>
  </q-page>
</template>

<script>
import TabPaneStudyGeneralities from '../components/TabPaneStudyGeneralities'
import TabPaneStudyCriteria from '../components/TabPaneStudyCriteria'
import TabPaneStudyTasks from '../components/TabPaneStudyTasks'
import TabPaneStudyConsent from '../components/TabPaneStudyConsent'
import API from '../data/API.js'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'StudyDesignLayout',
  props: ['propStudyKey', 'propTeamKey'],
  components: {
    'tab-pane-study-generalities': TabPaneStudyGeneralities,
    'tab-pane-study-criteria': TabPaneStudyCriteria,
    'tab-pane-study-tasks': TabPaneStudyTasks,
    'tab-pane-study-consent': TabPaneStudyConsent
  },
  data () {
    return {
      keyOfStudy: '',
      studyDesign: {
        teamKey: '',
        publishedTS: undefined,
        generalities: {
          title: '',
          description: '',
          startDate: undefined,
          endDate: undefined,
          principalInvestigators: [
            {
              name: '',
              contact: '',
              institution: ''
            }
          ],
          institutions: [
            {
              name: '',
              contact: '',
              dataAccess: ''
            }
          ]
        },
        inclusionCriteria: {
          minAge: undefined,
          maxAge: undefined,
          gender: [],
          lifestyle: { active: 'notrequired', smoker: 'notrequired' },
          criteriaQuestions: [
            {
              title: '',
              answer: ''
            }
          ],
          diseases: { },
          medications: { }
        },
        tasks: [],
        consent: {
          invitation: '',
          privacyPolicy: '',
          taskItems: [],
          extraItems: []
        }
      }
    }
  },
  validations: {
    studyDesign: {
      generalities: {
        title: { required },
        description: { required },
        principalInvestigators: {
          required,
          $each: {
            name: { required },
            contact: { required },
            institution: { required }
          }
        },
        institutions: {
          required,
          $each: {
            name: { required },
            contact: { required },
            dataAccess: { required }
          }
        },
        startDate: { required },
        endDate: { required }
      },
      consent: {
        invitation: { required },
        privacyPolicy: { required }
      }
    }
  },
  async created () {
    // Populate the teamKey with the prop value
    if (!this.studyDesign.teamKey || this.studyDesign.teamKey === '') {
      this.studyDesign.teamKey = this.propTeamKey
    }
    // Populate Study if it has already been created before
    if (this.propStudyKey) {
      try {
        this.studyDesign = await API.getStudy(this.propStudyKey)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Cannot retrieve the study description. Please check the connection',
          icon: 'report_problem'
        })
      }
    }
  },
  methods: {
    checkValidation: function () {
      // Checking for Errors only in tabs generalities and Error
      var errorGen = false
      var errorCon = false
      this.$v.studyDesign.generalities.$touch()
      this.$v.studyDesign.consent.$touch()
      // Check for errors from validation
      if (this.$v.studyDesign.generalities.$error) {
        this.$q.notify('Please correct the fields in the Generalities tab.')
        errorGen = true
      }
      if (this.$v.studyDesign.consent.$error) {
        this.$q.notify('Please correct the fields in the Consent tab.')
        errorCon = true
      }
      // If there are any validation errors, the validation check has failed
      if (errorGen === true || errorCon === true) return false
    },
    async publish () {
      // If published not empty, study has already been published
      if (this.studyDesign.publishedTS) {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'This study has already been published.',
          icon: 'report_problem'
        })
      } else {
        // If there is a studyKey and validation passed, a draft exists
        if (this.propStudyKey) {
          if (this.checkValidation() !== false) {
            try {
              this.studyDesign.publishedTS = new Date()
              await API.updateDraftStudy(this.propStudyKey, this.studyDesign)
              this.$q.notify({
                color: 'primary',
                position: 'bottom',
                message: 'Study has been published.',
                icon: 'done'
              })
            } catch (err) {
              this.$q.notify({
                color: 'negative',
                position: 'bottom',
                message: 'Error. Please check the connection.',
                icon: 'report_problem'
              })
            }
          }
        } else {
          // If no studyKey, publish directly if validation passed
          if (this.checkValidation() !== false) {
            try {
              this.studyDesign.publishedTS = new Date()
              await API.publishStudy(this.studyDesign)
              this.$q.notify({
                color: 'primary',
                position: 'bottom',
                message: 'Study has been published.',
                icon: 'done'
              })
            } catch (err) {
              this.$q.notify({
                color: 'negative',
                position: 'bottom',
                message: 'Cannot publish. Please check the connection.',
                icon: 'report_problem'
              })
            }
          }
        }
      }
    },
    async saveProgress () {
      var checkStudyKey = ''
      // If there is a propStudykey, use that as the key and update the study only
      // If there is no propStudykey, then use the keyOfStudy after creating a new study to update
      if (this.propStudyKey) {
        checkStudyKey = this.propStudyKey
      } else if (this.propStudyKey === undefined && this.keyOfStudy) {
        checkStudyKey = this.keyOfStudy
      }
      if (checkStudyKey) {
        try {
          await API.updateDraftStudy(checkStudyKey, this.studyDesign)
          this.$q.notify({
            color: 'primary',
            position: 'bottom',
            message: 'Updated draft and saved Progress',
            icon: 'done'
          })
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: 'Cannot update and save progress. Please check the connection.',
            icon: 'report_problem'
          })
        }
      } else {
        try {
          // If no studyKey in the prop, then save the study for the 1st time
          this.studyDesign.createdTS = new Date()
          let response = await API.saveDraftStudy(this.studyDesign)
          this.keyOfStudy = response.data._key
          this.$q.notify({
            color: 'primary',
            position: 'bottom',
            message: 'Updated draft and saved Progress',
            icon: 'done'
          })
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: 'Cannot save progress. Please check the connection.',
            icon: 'report_problem'
          })
        }
      }
    },
    exitDesigner () {
      if (this.keyOfStudy === '') {
        this.$q.dialog({
          title: 'Exit',
          color: 'warning',
          message: 'You have not saved this draft. Would you like to continue exiting yet?',
          ok: 'Yes, exit without saving',
          cancel: 'Cancel'
        }).then(() => {
          this.$router.push('/researcher')
        }).catch(() => {
          this.$q.notify('Cancel')
        })
      } else {
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: 'Back to User home.',
          icon: 'arrow_back'
        })
        this.$router.push('/researcher')
      }
    }
  }
}
</script>
