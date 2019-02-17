<template>
  <q-tab-pane name="tab-study-description">
    <q-card>
      <q-card-title> Study Description1
      </q-card-title>
      <q-card-main>
        <div class="row justify-around">
           {{ studyDesign }}
        </div>
      </q-card-main>
    </q-card>

  </q-tab-pane>
</template>

<script>

export default {
  name: 'TabPaneStudyDescription',
  props: ['studyDesign'],
  data () {
    return {
      participants: {
        joined: 0,
        active: 0,
        completed: 0,
        withdrawn: 0
      }
    }
  },

  methods: {
    async downloadAnswers () {
      // TODO
    }
  }
}
</script>
