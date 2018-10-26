<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg form-card">
      <h4>Form Viewer</h4>
      <q-btn color="primary" @click="close()" label="Close" />
    <!-- Forms  -->
      <div class="shadow-1 q-pa-sm q-mt-lg" v-for="(form) in forms" :key="form.id">
        <q-field class="q-mb-sm" label="Form Title: " >
          <q-input v-model="form.name" readonly />
        </q-field>
        <q-field class="q-mb-sm" label="Form Description: " >
          <q-input v-model="form.description" readonly />
        </q-field>
      <!-- Questions -->
          <div class="shadow-1 q-pa-sm q-mt-lg" v-for="(question, qIndex) in form.questions" :key="qIndex">
            <div >
              <q-field class="q-ml-md q-mt-md q-mb-md" label="Question Number: " >
                <q-input v-model="question.qId" align="center" readonly/>
              </q-field>
              <q-field class="q-ml-md q-mt-md q-mb-md" label="Question: " :helper="question.qHelp" >
                <q-input v-model="question.qtext" type="textarea" rows="6" align="center" readonly/>
              </q-field>
        <!-- Answers -->
                <q-card class="bg-green-2 q-ml-md q-mt-lg q-mb-md q-mr-md">
                  <div  v-show="question.qType === 'single'">
                    <q-field class="q-ml-md q-mt-md q-mb-md" label="Please choose one of the following: " />
                    <div v-for="(answerChoice) in question.answerChoices" :key="answerChoice.id">
                        <q-radio class="q-ml-md q-mb-md" v-model="form.answerRadioValue" :val="answerChoice.answerId" :label=" answerChoice.text"/>
                    </div>
                  </div>
                  <div  v-show="question.qType === 'freetext'">
                      <q-field class="q-ml-md q-mt-md q-mb-md" label="Answer: " helper="Please write an answer." >
                        <q-input class="q-mb-md" v-model="form.freetextAnswer" align="center" type="textarea" rows="6" clearable/>
                      </q-field>
                  </div>
                  </q-card>
            </div>
          </div>
        </div>
      </div>
  </q-modal>
</template>

<script>
export default {
  name: 'FormViewer',
  props: ['formViewerProp'],
  data () {
    return {
      tempViewerHolder: '',
      opened: false,
      forms: [
        {
          answerRadioValue: '',
          name: '',
          description: '',
          questions: [
            {
              qtext: '',
              qHelp: '',
              qId: '',
              nextDefaultId: '',
              qType: '',
              answerChoices: [
                {
                  answerId: '',
                  text: '',
                  nextQuId: ''
                }
              ]
            }
          ],
          freetextAnswer: ''
        }
      ]
    }
  },
  created () {
    this.initViewer()
  },
  methods: {
    // Initialise Model with prop values from builder
    initViewer () {
      this.tempViewerHolder = this.formViewerProp
    },
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
