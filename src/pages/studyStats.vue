<template>
  <q-page>
    <q-toolbar color="secondary">
      <q-toolbar-title>
        Statistics about {{ studyDesign.generalities.title }}
      </q-toolbar-title>
      <q-btn  class="float-right q-mr-md" round color="black" icon="close" @click="$router.push('/researcher')"/>
    </q-toolbar>

    <q-tabs color="secondary">
      <q-tab default slot="title" name="tab-study-stats" icon="bar_chart" label="Study"/>

      <tab-pane-study-stats name="tab-study-stats" :studyDesign="studyDesign"/>
    </q-tabs>
  </q-page>
</template>

<script>
import API from '../data/API.js'
import TabPaneStudyStats from '../components/TabPaneStudyStats'

export default {
  name: 'StudyStats',
  props: ['studyKey'],
  components: { 'tab-pane-study-stats': TabPaneStudyStats },
  data () {
    return {
      studyDesign: {
        generalities: {
          title: ''
        }
      }
    }
  },
  async created () {
    try {
      this.studyDesign = await API.getStudy(this.studyKey)
    } catch (err) {
      this.$q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Cannot retrieve the study description. ' + err.message,
        icon: 'report_problem'
      })
    }
  }
}
</script>
