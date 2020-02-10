<template>
  <q-dialog v-model="opened">
    <q-card style="width: 800px; max-width: 90vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">
          Form builder
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-3 q-pt-sm">
              <div class="text-bold">
                Form name:
              </div>
              <div class="text-caption">
                Short name of the form.  This is used in several places of the user interface.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input-multilang v-model="value.name" type="text" @input="update()" :languages="languages" required/>
            </div>
          </div>
          <div class="row">
            <div class="col-3 q-pt-sm">
              <div class="text-bold">
                Description:
              </div>
              <div class="text-caption">
                Short description for the form. This is displayed to the user.
              </div>
            </div>
            <div class="col q-pl-sm">
              <q-input-multilang v-model="value.description" type="textarea" @input="update()" :languages="languages" required/>
            </div>
          </div>

          <div class="row q-ma-sm">
            <div class="col-2 text-bold"> Questions: </div>
          </div>
          <!-- Question -->
          <div class="shadow-1 q-pa-md q-mt-lg" v-for="(question, qIndex) in value.questions" :key="qIndex">
            <div class="q-pa-sm text-bold"> Question </div>
            <div class="row">
              <div class="col-2">
                ID.
                <div class="text-caption">
                  Identifier of this question.
                </div>
              </div>
              <div class="col q-pl-sm">
                <q-input label="ID" v-model="question.id" hint="This is set automatically." type="text" readonly/>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-2">
                Question Type.
                <div class="text-caption">
                  Type of question.
                </div>
              </div>
              <div class="col q-pl-sm">
                <q-select v-model="question.type" emit-value map-options :options="questionTypeOptions"  @input="update()"/>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-2">
                Question text.
                <div class="text-caption">
                  Text of the question.
                </div>
              </div>
              <div class="col q-pl-sm">
                <q-input-multilang v-model="question.text" type="text" @input="update()" :languages="languages" required/>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-2">
                Helper.
                <div class="text-caption">
                  Short subcaption or helper.
                </div>
              </div>
              <div class="col q-pl-sm">
                <q-input-multilang label="Helper" v-model="question.helper" type="text" @input="update()" :languages="languages"/>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-2">
                Next question ID.
                <div class="text-caption">
                  If not specified, the next available question will be used.
                </div>
              </div>
              <div class="col q-pl-sm">
                <q-select clearable color="secondary" v-model="question.nextDefaultId" :options="defaultIdSelection" hint="ENDFORM terminates the form." @input="update()"/>
              </div>
            </div>

            <!-- Answers -->
            <div class="q-pa-lg q-mt-sm shadow-1 bg-green-1" style="max-width: 800px" v-show="question.type !== 'freetext'" v-for="(answerChoice, aIndex) in question.answerChoices" :key="aIndex">
              <div class="q-pa-sm text-bold"> Answer </div>
              <div class="row q-mt-sm">
                <div class="col-2">
                  Answer ID.
                  <div class="text-caption">
                    Identifier of this answer.
                  </div>
                </div>
                <div class="col q-pl-sm">
                  <q-input label="Answer ID" v-model="answerChoice.id" type="text" readonly hint="This is auto generated."/>
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col-2">
                  Answer Text.
                  <div class="text-caption">
                    Text of this answer (e.g. 'Yes').
                  </div>
                </div>
                <div class="col q-pl-sm">
                  <q-input-multilang label="Answer Text" v-model="answerChoice.text" type="text" :languages="languages"/>
                </div>
              </div>
              <div class="row q-mt-sm" v-show="question.type !== 'multiChoice'">
                <div class="col-2">
                  Next Question ID.
                  <div class="text-caption">
                    Optional. This answer will be followed by the question with this ID.
                  </div>
                </div>
                <div class="col q-pl-sm">
                  <p v-show="answerChoice.nextQuestionId == 'REMOVED'" class="text-negative">THIS QUESTION HAS BEEN REMOVED!</p>
                  <q-select v-model="answerChoice.nextQuestionId" :options="defaultIdSelection" hint="ENDFORM will terminate the form." @input="update()" />
                </div>
              </div>
              <div class="row q-mt-md">
                <div class="col-6">
                  <q-btn v-if="aIndex !==0" color="negative" icon="remove" label="Remove this answer" @click="removeAnswerChoice(qIndex, aIndex)" />
                </div>
                <div class="col-6">
                  <q-btn v-if="aIndex === question.answerChoices.length-1" color="primary" label="Add an answer choice" icon="add" @click="addAnswerChoice(qIndex)" />
                </div>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-6">
                <q-btn v-if="qIndex !==0" color="negative" icon="remove" label="Remove this question" @click="removeQuestion(qIndex)" />
              </div>
              <div class="col-6">
                <q-btn v-if="qIndex === value.questions.length-1" label="Add a question" color="primary" icon="add" @click="addQuestion()" />
              </div>
            </div>
            <q-separator v-if="qIndex !== value.questions.length-1"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-btn color="secondary" @click="openFormSimulator()" label="Simulate" />
          </div>
          <div class="col">
            <q-btn color="primary" @click="publish()" label="Publish" />
          </div>
          <div class="col">
            <q-btn color="primary" @click="cancelForm()" label="Cancel" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import API from '../modules/API.js'
import QInputMultilang from './QInputMultilang'

export default {
  name: 'FormBuilder',
  props: ['value', 'languages'],
  components: {
    QInputMultilang
  },
  data () {
    return {
      questionsCounter: this.value.questions.length,
      questionTypeOptions: [{
        label: 'Freetext',
        value: 'freetext'
      },
      {
        label: 'Single choice',
        value: 'singleChoice'
      }, {
        label: 'Multiple choice',
        value: 'multiChoice'
      }],
      opened: false
    }
  },
  computed: {
    defaultIdSelection () {
      let ret = ['ENDFORM']
      for (let i = 0; i < this.value.questions.length; i++) {
        ret.push(this.value.questions[i].id)
      }
      return ret
    }
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    },
    show () {
      this.opened = true
    },
    openFormSimulator () {
      this.opened = false
      this.$emit('simulateForm', this.value)
    },
    addQuestion () {
      let qid = 'Q' + (this.value.questions.length + 1)
      let newQuestion = {
        id: qid,
        text: {},
        helper: {},
        type: 'singleChoice',
        nextDefaultId: undefined,
        answerChoices: [{
          id: qid + 'A1',
          text: {},
          nextQuestionId: undefined
        }]
      }
      for (let lang of this.languages) {
        newQuestion.text[lang] = ''
        newQuestion.helper[lang] = ''
        newQuestion.answerChoices[0].text[lang] = ''
      }
      this.value.questions.push(newQuestion)
    },
    // removes a question and updates all question IDs, answerChoiceIDs and nextQuestionIDs
    removeQuestion (qIndex) {
      this.value.questions.splice(qIndex, 1)

      // update all indexes
      for (let qi = 0; qi < this.value.questions.length; qi++) {
        // update the indexes after the one that has been removed
        if (qi >= qIndex) this.value.questions[qi].id = 'Q' + (qi + 1)
        // update the nextDefaultIds
        if (this.value.questions[qi].nextDefaultId && this.value.questions[qi].nextDefaultId.startsWith('Q')) {
          if (this.value.questions[qi].nextDefaultId === 'Q' + (qIndex + 1)) {
            this.value.questions[qi].nextDefaultId = 'REMOVED'
          } else {
            let qid = parseInt(this.value.questions[qi].nextDefaultId.split(/Q/)[1])
            if (qid > qIndex + 1) this.value.questions[qi].nextDefaultId = 'Q' + (qid - 1)
          }
        }
        // update the answer choices IDs
        if (this.value.questions[qi].type === 'singleChoice' || this.value.questions[qi].type === 'multipleChoice') {
          for (let ai = 0; ai < this.value.questions[qi].answerChoices.length; ai++) {
            this.value.questions[qi].answerChoices[ai].id = this.value.questions[qi].id + 'A' + (ai + 1)
            // update the nextQuestionIds
            if (this.value.questions[qi].answerChoices[ai].nextQuestionId && this.value.questions[qi].answerChoices[ai].nextQuestionId.startsWith('Q')) {
              if (this.value.questions[qi].answerChoices[ai].nextQuestionId === 'Q' + (qIndex + 1)) {
                this.value.questions[qi].answerChoices[ai].nextQuestionId = 'REMOVED'
              } else {
                let qid = parseInt(this.value.questions[qi].answerChoices[ai].nextQuestionId.split(/Q/)[1])
                if (qid > qIndex + 1) this.value.questions[qi].answerChoices[ai].nextQuestionId = 'Q' + (qid - 1)
              }
            }
          }
        }
      }
    },
    // add an answer choice
    addAnswerChoice (qIndex) {
      if (!this.value.questions[qIndex].answerChoices) this.value.questions[qIndex].answerChoices = []
      let newAnswer = {
        id: this.value.questions[qIndex].id + 'A' + (this.value.questions[qIndex].answerChoices.length + 1),
        text: {},
        nextQuestionId: undefined
      }
      for (let lang of this.languages) {
        newAnswer.text[lang] = ''
      }
      this.value.questions[qIndex].answerChoices.push(newAnswer)
    },
    // removes an answer choice
    removeAnswerChoice (qIndex, aIndex) {
      this.value.questions[qIndex].answerChoices.splice(aIndex, 1)
      for (let i = aIndex; i < this.value.questions[qIndex].answerChoices.length; i++) {
        this.value.questions[qIndex].answerChoices[i].id = this.value.questions[qIndex].id + 'A' + (i + 1)
      }
    },
    // cancel the form
    cancelForm () {
      this.opened = false
      // TODO: Add logic to reset newForm
    },
    // publish the form
    async publish () {
      try {
        await API.publishForm(this.value)
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: 'The form has been published.',
          icon: 'done'
        })
        this.$emit('saved', this.value)
        this.opened = false
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Cannot Publish the form. Check the connection and reload the page.',
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
