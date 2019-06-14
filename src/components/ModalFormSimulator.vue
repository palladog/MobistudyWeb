<template>
  <q-dialog v-model="opened">
    <div class="q-pa-lg form-card">
      <h4>Form Simulator</h4>
      <div v-show="!finished">
        <q-field class="q-ml-md q-mt-md q-mb-md" label="Question ID: " >
          {{currentQuestion.id}}
        </q-field>
        <q-field class="q-ml-md q-mt-md q-mb-md" label="Question: " :helper="currentQuestion.helper" >
          {{currentQuestion.text}}
        </q-field>
        <!-- Answers -->
        <q-card class="bg-green-2 q-ml-md q-mt-lg q-mb-md q-mr-md">
          <div v-if="currentQuestion.type === 'singleChoice'">
            <q-field class="q-ml-md q-mt-md q-mb-md" label="Please choose one of the following: ">
              <div v-for="(answerChoice, index) in currentQuestion.answerChoices" :key="index">
                <q-radio class="q-ml-md q-mb-md" v-model="currentAnswerSingleChoice"
                :val="answerChoice.id" :label="answerChoice.text"/>
              </div>
            </q-field>
          </div>
          <div v-if="currentQuestion.type === 'multiChoice'">
            <q-field class="q-ml-md q-mt-md q-mb-md" label="Please choose one of the following: " />
            <q-checkbox v-for="(answerChoice, index) in currentQuestion.answerChoices" :key="index"
            class="q-ml-md q-mb-md" v-model="currentAnswerMultiChoice"
            :val="answerChoice.id" :label="answerChoice.text"/>
          </div>
          <div v-if="currentQuestion.type === 'freetext'">
            <q-field class="q-ml-md q-mt-md q-mb-md" label="Answer: " helper="Please write an answer." >
              <q-input class="q-mb-md" v-model="currentAnswerFreeText" align="center" type="textarea" rows="3" clearable/>
            </q-field>
          </div>
        </q-card>
      </div>

      <div v-show="finished">
        COMPLETED
      </div>
      <q-btn v-show="!finished" color="primary" @click="next()" label="Next" />
      <q-btn v-show="finished" color="primary" @click="restart()" label="Restart" />
      <q-btn color="secondary" @click="close()" label="Close" />
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'FormViewer',
  props: ['form'],
  data () {
    return {
      tempViewerHolder: '',
      opened: false,
      currentIndex: 0,
      currentQuestion: {
        id: undefined,
        text: undefined,
        helper: undefined,
        type: 'freetext',
        nextDefaultId: undefined,
        answerChoices: [{
          id: undefined,
          text: undefined
        }]
      },
      currentAnswerSingleChoice: undefined,
      currentAnswerMultiChoice: [],
      currentAnswerFreeText: undefined,
      finished: false
    }
  },
  methods: {
    show () {
      this.finished = false
      this.currentIndex = 0
      this.currentQuestion = this.form.questions[0]
      this.currentAnswerSingleChoice = undefined
      this.currentAnswerMultiChoice = []
      this.currentAnswerFreeText = undefined
      this.opened = true
    },
    restart () {
      this.finished = false
      this.currentIndex = 0
      this.currentQuestion = this.form.questions[0]
      this.currentAnswerSingleChoice = undefined
      this.currentAnswerMultiChoice = []
      this.currentAnswerFreeText = undefined
    },
    close () {
      this.opened = false
      this.$emit('closed')
    },
    next () {
      let type = this.currentQuestion.type
      let nextQId
      if (type === 'freetext' || type === 'multiChoice') {
        if (this.currentQuestion.nextDefaultId) nextQId = this.currentQuestion.nextDefaultId
      } else if (type === 'singleChoice') {
        if (this.currentAnswerSingleChoice) {
          let anschoice = this.currentQuestion.answerChoices.find((a) => { return a.id ? a.id === this.currentAnswerSingleChoice : false })
          if (anschoice && anschoice.nextQuestionId) {
            nextQId = anschoice.nextQuestionId
          } else {
            nextQId = this.currentQuestion.nextDefaultId
          }
        } else nextQId = this.currentQuestion.nextDefaultId
      }

      if (!nextQId) {
        if (this.currentIndex === (this.form.questions.length - 1)) nextQId = 'ENDFORM'
        else nextQId = 'Q' + (this.currentIndex + 2)
      }

      if (nextQId === 'ENDFORM') {
        this.finished = true
      } else {
        let nextQIdx = this.form.questions.findIndex((q) => { return q.id === nextQId })
        this.currentAnswerSingleChoice = undefined
        this.currentAnswerMultiChoice = []
        this.currentAnswerFreeText = undefined
        this.currentIndex = nextQIdx
        this.currentQuestion = this.form.questions[nextQIdx]
      }
    }
  }
}
</script>
