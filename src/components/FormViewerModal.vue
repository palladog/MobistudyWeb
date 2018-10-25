<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg form-card">
      <h4>Form Viewer</h4>
      <q-btn color="primary" @click="close()" label="Close" />
    <!-- Forms  -->
      <div class="shadow-1 q-pa-sm q-mt-lg" v-for="(form) in forms" :key="form.id">
        <q-field class="q-mb-sm" label="Form Title: " >
          <q-input v-model="form.name" />
        </q-field>
        <q-field class="q-mb-sm" label="Form Description: " >
          <q-input v-model="form.description" />
        </q-field>
          <div v-for="(question, qIndex) in form.questions" :key="qIndex">
            <div >
              <q-field class="q-ml-md q-mt-md q-mb-md" label="Question Number: " >
                <q-input v-model="question.qId" align="center" readonly/>
              </q-field>
              <q-field class="q-ml-md q-mt-md q-mb-md" label="Question: " :helper="question.qHelp" >
                <q-input v-model="question.qtext" type="textarea" rows="6" align="center" readonly/>
              </q-field>
            </div>
          </div>
        </div>
      </div>
  </q-modal>
</template>

<script>
export default {
  name: 'FormViewer',
  props: ['form'],
  data () {
    return {
      opened: false,
      forms: [
        {
          name: 'else',
          description: 'something',
          questions: [
            {
              qtext: 'sd',
              qHelp: 'vd',
              qId: 'Initial Question'
            }
          ]
        }
      ]
    }
  },
  methods: {
    show () {
      this.opened = true
    },
    close () {
      this.opened = false
      this.$emit('closed')
    }
  }
}
</script>
