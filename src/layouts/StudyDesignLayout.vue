<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'" >
        <q-toolbar-title>
          MobiStudy
          <span slot="subtitle">Running on Quasar v{{ $q.version }}</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar color="secondary">
        <q-toolbar-title>
          Study designer
        </q-toolbar-title>
        <q-btn class="q-mr-md" color="warning" label="Save Draft" @click="saveProgress"/>
        <q-btn class="float-right q-mr-md" color="negative" label="Publish" @click="publish"/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-tabs color="secondary">
        <q-tab default slot="title" name="tab-gen" icon="subject" label="Generalities" />
        <q-tab slot="title" name="tab-crit" icon="fingerprint" label="Inclusion Criteria" />
        <!-- <q-tab slot="title" name="tab-tasks" icon="list" label="Tasks"/> -->
        <!-- <q-tab slot="title" name="tab-consent" icon="verified_user" label="Consent"/> -->

        <tab-pane-study-generalities name="tab-gen" :generalities="studyDesign.generalities"></tab-pane-study-generalities>
        <tab-pane-study-criteria name="tab-crit" :criteria="studyDesign.inclusionCriteria" ></tab-pane-study-criteria>
        <!-- <tab-pane-study-tasks name="tab-tasks" :tasks="studyDesign.tasks" ></tab-pane-study-tasks> -->
        <!-- <tab-pane-study-consent name="tab-consent" :consent="studyDesign.consent"></tab-pane-study-consent> -->
      </q-tabs>
    </q-page-container>
  </q-layout>
</template>

<script>
import TabPaneStudyGeneralities from '../components/TabPaneStudyGeneralities'
import TabPaneStudyCriteria from '../components/TabPaneStudyCriteria'
import TabPaneStudyTasks from '../components/TabPaneStudyTasks'
import TabPaneStudyConsent from '../components/TabPaneStudyConsent'

export default {
  name: 'StudyDesignLayout',
  props: ['studyId'],
  components: {
    'tab-pane-study-generalities': TabPaneStudyGeneralities,
    'tab-pane-study-criteria': TabPaneStudyCriteria,
    'tab-pane-study-tasks': TabPaneStudyTasks,
    'tab-pane-study-consent': TabPaneStudyConsent
  },
  data () {
    return {
      studyDesign: {
        generalities: {
          title: '',
          description: '',
          startDate: undefined,
          endDate: undefined,
          principalInvestigators: [ ],
          institutions: [ ]
        },
        inclusionCriteria: {
          minAge: undefined,
          maxAge: undefined,
          gender: [],
          lifestyle: { active: 'notrequired', smoker: 'notrequired' },
          criteriaQuestions: [ ],
          diseases: { },
          medications: { }
        }
      }
    }
  },
  async beforeCreate () {
    // TODO: use the studyId
    let resp = await this.$axios.get('/api/studies/32922302')
    this.studyDesign = resp.data
  },
  methods: {
    publish () {
      // TODO: set completed to true or a date
      this.$q.notify('Publish Q')
    },
    saveProgress () {
      this.$q.notify('Save Progress')
      // TODO: axios.post or you put it depending if you have the studyId
    }
  }
}
</script>
