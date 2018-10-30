<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg form-card">
      <h4>Form builder</h4>
      <q-field class="q-mb-sm" label="Name:" helper="Name of the form. This is displayed to the user.">
        <q-input v-model="value.name" type="text" clearable @input="update()"/>
      </q-field>
      <q-field class="q-mb-sm" label="Description: " helper="Short description for the form. This is displayed to the user.">
        <q-input v-model="value.description" type="textarea" rows="3" clearable @input="update()"/>
      </q-field>

      <!-- Question -->
      <div class="shadow-1 q-pa-sm q-mt-lg" v-for="(question, qIndex) in value.questions" :key="qIndex">
        <q-field label="Question ID: ">
          <q-input v-model="question.id" type="text" style="max-width: 60px" readonly/>
        </q-field>
        <q-field label="Question Type: " helper="Select a question type.">
          <q-select style="width: 200px" v-model="question.type" :options="questionTypeOptions" @input="update()"/>
        </q-field>
        <q-field label="Question: " helper="Text of the question. This is displayed to the user.">
          <q-input v-model="question.text" type="text" clearable @input="update()"/>
        </q-field>
        <q-field label="Help: " helper="Short description or helper. This is displayed to the user.">
          <q-input v-model="question.helper" type="text" clearable @input="update()"/>
        </q-field>
        <q-field label="Default/Next Question ID: " helper="If not specified, the next available question will be used. Terminate the form with 'ENDFORM'.">
          <p v-show="question.nextDefaultId == 'REMOVED'" class="text-negative">THIS QUESTION HAS BEEN REMOVED!</p>
          <q-select style="width: 110px" color="secondary" v-model="question.nextDefaultId" :options="defaultIdSelection" @input="update()" />
        </q-field>

        <!-- Answers -->
        <div class="q-pa-lg q-mt-sm shadow-1 bg-green-1" style="max-width: 800px" v-show="question.type !== 'freetext'" v-for="(answerChoice, aIndex) in question.answerChoices" :key="aIndex">
          <q-field label="Answer ID:" >
            <q-input v-model="answerChoice.id" type="text" readonly style="max-width: 80px"/>
          </q-field>
          <q-field label="Answer Text: " helper="Answer text (e.g. Yes or No). This is displayed to the user.">
            <q-input v-model="answerChoice.text" type="text" clearable />
          </q-field>
          <q-field v-show="question.type !== 'multiChoice'" label="Next Question ID: " helper="Optional. If specified, when this answer is selected, the next question will be the one with this ID. Terminate the form with the 'ENDFORM'." >
            <p v-show="answerChoice.nextQuestionId == 'REMOVED'" class="text-negative">THIS QUESTION HAS BEEN REMOVED!</p>
            <q-input v-model="answerChoice.nextQuestionId" type="text" clearable style="max-width: 150px"/>
          </q-field>
          <div class="row">
            <div class="col-6">
              <q-btn v-if="aIndex !==0" color="negative" icon="remove" label="Remove this answer" @click="removeAnswerChoice(qIndex, aIndex)" />
            </div>
            <div class="col-6">
              <q-btn v-if="aIndex === question.answerChoices.length-1" color="primary" label="Add an answer choice" icon="add" @click="addAnswerChoice(qIndex)" />
            </div>
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="col-6">
            <q-btn v-if="qIndex !==0" color="negative" icon="remove" label="Remove this question" @click="removeQuestion(qIndex)" />
          </div>
          <div class="col-6">
            <q-btn v-if="qIndex === value.questions.length-1" label="Add a question" color="primary" icon="add" @click="addQuestion()" />
          </div>
        </div>
        <q-card-separator v-if="qIndex !== value.questions.length-1"/>
      </div>

      <div class="row q-ma-md">
        <div class="col-4">
          <q-btn color="secondary" @click="openFormSimulator()" label="Simulate" />
        </div>
        <div class="col-4">
          <q-btn color="primary" @click="publish()" label="Publish" />
        </div>
        <div class="col-4">
          <q-btn color="primary" @click="cancelForm()" label="Cancel" />
        </div>
      </div>
    </div>
  </q-modal>
</template>

<script>
import API from '../data/API.js'

export default {
  name: 'FormBuilder',
  props: ['value'],
  data () {
    return {
      questionsCounter: this.value.length,
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
      opened: false,
      defaultIdSelection: [{
        label: 'ENDFORM',
        value: 'ENDFORM'
      },
      {
        label: 'Q1',
        value: 'Q1'
      }]
    }
  },
  // computed: {
  //   defaultIdSelection () {
  //     let ret = [{
  //       label: 'ENDFORM',
  //       value: 'ENDFORM'
  //     }]
  //     for i , this,questions.lenght i++
  //     ret.push({ Q + i})
  //   }
  // },
  methods: {
    show () {
      this.opened = true
    },
    openFormSimulator () {
      this.opened = false
      this.$emit('simulateForm', this.value)
    },
    update () {
      this.$emit('input', this.value)
    },
    addQuestion () {
      let qid = 'Q' + (this.value.questions.length + 1)
      this.value.questions.push({
        id: qid,
        text: undefined,
        type: 'singleChoice',
        nextDefaultId: undefined,
        answerChoices: [{
          id: qid + 'A1',
          text: undefined,
          nextQuestionId: undefined
        }]
      })
      this.defaultIdSelection.push({label: qid, value: qid})
    },
    // removes a question and updates all question IDs, answerChoiceIDs and nextQuestionIDs
    removeQuestion (qIndex) {
      this.value.questions.splice(qIndex, 1)
      // Remove last element from Default Question ID selection. Keep ID only for first question.
      if (this.defaultIdSelection.length > 2) this.defaultIdSelection.pop()

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
      this.value.questions[qIndex].answerChoices.push({
        id: this.value.questions[qIndex].id + 'A' + (this.value.questions[qIndex].answerChoices.length + 1),
        text: undefined,
        nextQuestionId: undefined
      })
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
      this.opened = false
      try {
        await API.publishForm(this.value)
        this.$q.notify({
          color: 'primary',
          position: 'bottom',
          message: 'The form has been published.',
          icon: 'done'})
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
