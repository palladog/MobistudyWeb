<template>
  <q-dialog v-model="opened">
    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h5 q-mb-md">Form Simulator</div>
        <div v-show="!finished">
          <div class="row">
            <div class="col-2 text-bold"> Question ID: </div>
            <div class="col"> {{currentQuestion.id}} </div>
          </div>
          <div align="center" class="text-h6">
            {{currentQuestion.text}}
          </div>
          <div align="center" class="text-weight-light">
            {{currentQuestion.helper}}
          </div>
          <!-- Answers -->
          <q-card class="bg-green-2 q-ma-md">
            <div>
              Answer
            </div>
            <q-input v-if="currentQuestion.type === 'freetext'" class="q-ma-sm" v-model="currentAnswerFreeText"
            align="center" type="textarea" rows="3" clearable hint="Write your answer here."/>
            <div class="q-ma-sm" v-if="currentQuestion.type === 'singleChoice'">
              <q-field hint="Please choose one.">
                <q-radio v-for="(answerChoice, index) in currentQuestion.answerChoices" :key="index" v-model="currentAnswerSingleChoice"
                :val="answerChoice.id" :label="answerChoice.text"/>
              </q-field>
            </div>
            <div class="q-ma-sm" v-if="currentQuestion.type === 'multiChoice'">
              <q-field hint="Please choose one or more.">
                <q-checkbox v-for="(answerChoice, index) in currentQuestion.answerChoices" :key="index"
                v-model="currentAnswerMultiChoice" :val="answerChoice.id" :label="answerChoice.text"/>
              </q-field>
            </div>
          </q-card>
        </div>

        <div class="q-ma-md" v-show="finished">
          COMPLETED
        </div>
        <q-btn v-show="!finished" color="primary" @click="next()" label="Next" />
        <q-btn v-show="finished" color="primary" @click="restart()" label="Restart" />
        <q-btn color="secondary" @click="close()" label="Close" />
      </q-card-section>
    </q-card>
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
