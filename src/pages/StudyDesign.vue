<template>
  <q-page>
    <q-toolbar class="bg-secondary text-white">
      <q-toolbar-title>
        Study Designer
      </q-toolbar-title>
      <q-btn class="q-mr-md" v-show="studyKey && !studyDesign.publishedTS" color="negative" label="Delete Draft" @click="removeDraftStudy()"/>
      <q-btn class="q-mr-md" v-show="!studyDesign.publishedTS" color="warning" label="Save Draft" @click="saveProgress()"/>
      <q-btn class="float-right q-mr-md" v-show="!studyDesign.publishedTS" color="positive" label="Publish" @click="publish()"/>
      <q-btn class="float-right q-mr-md" v-show="studyDesign.publishedTS" disabled color="blue" label="Published"/>
      <q-btn class="float-right q-mr-md" round color="black" icon="close" @click="exitDesigner"/>
    </q-toolbar>

    <q-tabs v-model="studyTab" class="bg-secondary text-white shadow-2" align="justify">
      <q-tab name="tab-gen" icon="subject" label="Generalities" :class="$v.studyDesign.generalities.$error? 'text-red': ''"/>
      <q-tab name="tab-crit" icon="fingerprint" label="Inclusion Criteria" :class="$v.studyDesign.inclusionCriteria.$error? 'text-red': ''"/>
      <q-tab name="tab-tasks" icon="list" label="Tasks" :class="$v.studyDesign.tasks.$error? 'text-red': ''"/>
      <q-tab name="tab-consent" icon="verified_user" label="Consent" :class="$v.studyDesign.consent.$error? 'text-red': ''"/>
    </q-tabs>
    <q-tab-panels v-model="studyTab">
      <q-tab-panel name="tab-gen">
        <study-design-generalities v-model="studyDesign.generalities" :v="$v.studyDesign.generalities"></study-design-generalities>
      </q-tab-panel>
      <q-tab-panel name="tab-crit">
        <study-design-criteria v-model="studyDesign.inclusionCriteria" :v="$v.studyDesign.inclusionCriteria" :languages="studyDesign.generalities.languages"></study-design-criteria>
      </q-tab-panel>
      <q-tab-panel name="tab-tasks">
        <study-design-tasks v-model="studyDesign" :teamKey="studyDesign.teamKey" :v="$v.studyDesign.tasks"></study-design-tasks>
      </q-tab-panel>
      <q-tab-panel name="tab-consent">
        <study-design-consent v-model="studyDesign" :v="$v.studyDesign"></study-design-consent>
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script>
import StudyDesignGeneralities from '../components/StudyDesignGeneralities'
import StudyDesignCriteria from '../components/StudyDesignCriteria'
import StudyDesignTasks from '../components/StudyDesignTasks'
import StudyDesignConsent from '../components/StudyDesignConsent'
import API from '../modules/API.js'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'StudyDesignLayout',
  props: ['propStudyKey', 'propTeamKey'],
  components: {
    StudyDesignGeneralities,
    StudyDesignCriteria,
    StudyDesignTasks,
    StudyDesignConsent
  },
  data () {
    return {
      keyOfStudy: undefined,
      studyTab: 'tab-gen',
      studyDesign: {
        teamKey: '',
        publishedTS: undefined,
        generalities: {
          languages: ['en'],
          title: {
            en: '',
            sv: ''
          },
          shortDescription: {
            en: '',
            sv: ''
          },
          longDescription: {
            en: '',
            sv: ''
          },
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
              dataAccess: '',
              reasonForDataAccess: {
                en: '',
                sv: ''
              }
            }
          ]
        },
        inclusionCriteria: {
          countries: ['sv'],
          minAge: undefined,
          maxAge: undefined,
          sex: [
            'male',
            'female',
            'other'
          ],
          numberOfParticipants: undefined,
          lifestyle: { active: 'notrequired', smoker: 'notrequired' },
          criteriaQuestions: [],
          diseases: [],
          medications: []
        },
        tasks: [],
        consent: {
          invitation: {
            en: '',
            sv: ''
          },
          privacyPolicy: {
            en: '',
            sv: ''
          },
          taskItems: [],
          extraItems: []
        }
      }
    }
  },
  validations: {
    studyDesign: {
      generalities: {
        languages: { required },
        title: { required },
        shortDescription: { required },
        longDescription: { required },
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
            dataAccess: { required },
            reasonForDataAccess: {
              required: requiredIf(function (institution) {
                return institution.dataAccess !== 'no'
              })
            }
          }
        },
        startDate: { required },
        endDate: { required }
      },
      inclusionCriteria: {
        countries: { required },
        minAge: { required },
        maxAge: { required },
        sex: { required }
      },
      tasks: {
        required,
        minLength: minLength(1)
      },
      consent: {
        invitation: { required },
        privacyPolicy: { required }
      }
    }
  },
  computed: {
    studyKey () {
      let key = false
      // If there is a propStudykey, use that as the key and update the study only
      // If there is no propStudykey, then use the keyOfStudy after creating a new study to update
      if (this.propStudyKey) {
        key = this.propStudyKey
      } else if (this.propStudyKey === undefined && this.keyOfStudy) {
        key = this.keyOfStudy
      }
      return key
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
      let errors = false
      this.$v.studyDesign.$touch()
      this.$v.studyDesign.generalities.$touch()
      this.$v.studyDesign.inclusionCriteria.$touch()
      this.$v.studyDesign.tasks.$touch()
      this.$v.studyDesign.consent.$touch()
      // Check for errors from validation
      if (this.$v.studyDesign.generalities.$error) {
        this.$q.notify('Please correct the fields in the Generalities tab.')
        errors = true
      } else if (this.$v.studyDesign.inclusionCriteria.$error) {
        this.$q.notify('Please correct the fields in the Inclusion criteria tab.')
        errors = true
      } else if (this.$v.studyDesign.tasks.$error) {
        this.$q.notify('Please correct the fields in the Tasks tab.')
        errors = true
      } else if (this.$v.studyDesign.consent.$error) {
        this.$q.notify('Please correct the fields in the Consent tab.')
        errors = true
      }
      // If there are any validation errors, the validation check has failed
      return !errors
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
        if (this.checkValidation() !== false) {
          if (this.studyKey) {
            // If there is a studyKey, a draft exists
            try {
              this.studyDesign.publishedTS = new Date()
              await API.updateDraftStudy(this.propStudyKey, this.studyDesign)
              this.$q.notify({
                color: 'primary',
                position: 'bottom',
                message: 'Study has been published.',
                icon: 'done'
              })
              this.$router.push('/researcher')
            } catch (err) {
              this.$q.notify({
                color: 'negative',
                position: 'bottom',
                message: 'Error. Please check the connection.',
                icon: 'report_problem'
              })
            }
          } else {
            // If no studyKey, publish directly
            try {
              this.studyDesign.publishedTS = new Date()
              await API.publishStudy(this.studyDesign)
              this.$q.notify({
                color: 'primary',
                position: 'bottom',
                message: 'Study has been published.',
                icon: 'done'
              })
              this.$router.push('/researcher')
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
      if (this.studyKey) {
        try {
          await API.updateDraftStudy(this.studyKey, this.studyDesign)
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
    async removeDraftStudy () {
      if (this.studyKey && !this.studyDesign.publishedTS) {
        try {
          await this.$q.dialog({
            title: 'Remove Study',
            color: 'warning',
            message: 'You are deleting the draft Study. Would you like to continue?',
            ok: 'Yes, delete the study.',
            cancel: 'Cancel'
          })
          // Remove from db
          try {
            await API.deleteStudy(this.studyKey)
            this.$router.push('/researcher')
          } catch (error) {
            this.$q.notify({
              color: 'negative',
              position: 'bottom',
              message: 'Cannot delete the study: ' + error.message,
              icon: 'report_problem'
            })
          }
        } catch (error) {
          // nothing to do
        }
      }
    },
    exitDesigner () {
      if (this.keyOfStudy === '') {
        this.$q.dialog({
          title: 'Exit',
          color: 'warning',
          message: 'You have not saved this draft. Would you like to continue exiting?',
          ok: 'Yes, exit without saving',
          cancel: 'Cancel'
        }).then(() => {
          this.$router.push('/researcher')
        }).catch(() => {
          this.$q.notify('Cancel')
        })
      } else {
        this.$router.push('/researcher')
      }
    }
  }
}
</script>
