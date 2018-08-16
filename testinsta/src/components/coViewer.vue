<template>
  <q-page>
    <!-- QDesPos Tab -->
    <q-card class="bg-light-blue-2 q-ma-xl">
        <q-card-title>Resulting form
            <span slot="subtitle">View the designed form.</span>
            <q-btn class="float-right q-mr-md" color="black" label="load Test JSON" @click="testLoadJSON"/>
            </q-card-title>
            <q-card-separator class="q-mb-md q-mt-xl"/>
            <q-card-main>
          <!-- QDesPos - Forms  -->
            <div v-for="(form) in forms" :key="form.id">
              <q-field class="q-mb-sm" label="Form Title: " >
                <q-input v-model="form.fname" />
              </q-field>
              <q-field class="q-mb-sm" label="Form Description: " >
                <q-input v-model="form.fDescription" />
              </q-field>
              <q-card-separator class="q-mb-md q-mt-xl"/>
          <!-- QDesPos - Questions -->
              <q-card class="bg-teal-1 q-mt-lg q-mb-md">
              <div v-for="(question, qIndex) in form.questions" :key="question.id">
                <div  v-show="qIndex === indexToShow">
                <q-field class="q-ml-md q-mt-md q-mb-md" label="Question Number: " >
                  <q-input v-model="question.qId" align="center" readonly/>
                </q-field>
                <q-field class="q-ml-md q-mt-md q-mb-md" label="Question: " :helper="question.qHelp" >
                  <q-input v-model="question.qtext" type="textarea" rows="6" align="center" readonly/>
                </q-field>
                <q-card-separator class="q-mb-md q-mt-md"/>
          <!-- QDesPos - Answers -->
                  <q-card class="bg-green-2 q-ml-md q-mt-lg q-mb-md q-mr-md">
                  <div  v-show="question.qType === 'single'">
                    <q-field class="q-ml-md q-mt-md q-mb-md" label="Please choose one of the following: " />
                    <div v-for="(answerChoice) in question.answerChoices" :key="answerChoice.id">
                        <q-radio class="q-ml-md q-mb-md" v-model="form.ansRadioVal" :val="answerChoice.answerId" :label=" answerChoice.text"/>
                    </div>
                  </div>
                  <div  v-show="question.qType === 'freetext'">
                      <q-field class="q-ml-md q-mt-md q-mb-md" label="Answer: " helper="Please write an answer." >
                        <q-input class="q-mb-md" v-model="form.tempAnsHolder" align="center" type="textarea" rows="6" clearable/>
                      </q-field>
                  </div>
                  </q-card>
                  <div  v-show="showNextBtn">
                  <q-btn class="q-ml-md q-mb-md q-mt-md" icon-right="navigate_next" color="blue-7" label="Next Question" @click="nextTapped(question.qType)"/>
                  </div>
                  <q-card-separator class="q-mb-md q-mt-sm"/>
                </div>
              </div>
              </q-card>
            </div>
             <div  v-show="showFinishBtn">
              <q-btn class="q-mr-md q-mb-md float-right" icon-right="done_all" color="red-7" label="Finish" @click="finishForm"/>
            </div>
            </q-card-main>
        <q-btn class="q-ml-md q-mb-md q-mt-md" color="amber-5" icon="navigate_before" @click="goBack">Go Back to Designer</q-btn>
    </q-card>
  </q-page>
</template>

<script>
export default {
  props: ['valFromParent'],
  data () {
    return {
      tval: '',
      currFIndex: 0,
      currQIndex: 0,
      currAIndex: 0,
      indexToShow: 0,
      showNextBtn: true,
      showFinishBtn: false,
      forms: [
        {
          ansRadioVal: '',
          answers: [
            {
              questionId: '',
              answerText: '',
              answerId: '',
              timeStamp: ''
            }
          ],
          counterAnswers: 0,
          fDescription: '',
          fname: '',
          questions: [
            {
              qtext: '',
              qHelp: '',
              qId: 'Initial Question',
              nextDefaultId: '',
              qType: 'single',
              answerChoices: [
                {
                  answerId: 'Answer 1',
                  text: '',
                  nextQuId: '',
                  showAnswerLabelError: false
                }
              ]
            }
          ],
          qTrackingID: [
            {
              quesID: 'Initial Question',
              quesIndex: 0
            }
          ],
          tempAnsHolder: ''
        }
      ]
    }
  },
  created () {
    this.initModel()
  },
  methods: {
    // Initialise Model with prop values
    initModel () {
      var i, j, k
      this.tval = this.valFromParent
      var propObj = this.tval.formComponentObj
      var fIndx = this.currFIndex
      var currForm = this.forms[fIndx]
      currForm.fDescription = propObj.fDescription
      currForm.fname = propObj.fname
      // Find values for each question,
      // Get length from prop questions array
      var lenQ = Object.keys(propObj.questions).length
      for (i = 0; i < lenQ; i++) {
        if (i === 0) {
          currForm.questions[i].qtext = propObj.questions[i].qtext
          currForm.questions[i].qHelp = propObj.questions[i].qHelp
          currForm.questions[i].qId = propObj.questions[i].qId
          currForm.questions[i].nextDefaultId = propObj.questions[i].nextDefaultId
          currForm.questions[i].qType = propObj.questions[i].qType
        } else if (i > 0) {
          // if more than 1 question, then need to create others
          currForm.questions.push({
            qtext: propObj.questions[i].qtext,
            qHelp: propObj.questions[i].qHelp,
            qId: propObj.questions[i].qId,
            nextDefaultId: propObj.questions[i].nextDefaultId,
            qType: propObj.questions[i].qType,
            answerChoices: [
              {
                answerId: 'Answer 1',
                text: '',
                nextQuId: '',
                showAnswerLabelError: false
              }
            ]
          })
        }
        // Find values for each answer Choice. Get length from prop Ans Cho array
        var lenAnsCho = Object.keys(propObj.questions[i].answerChoices).length
        for (j = 0; j < lenAnsCho; j++) {
          if (j === 0) {
            currForm.questions[i].answerChoices[j].answerId = propObj.questions[i].answerChoices[j].answerId
            currForm.questions[i].answerChoices[j].text = propObj.questions[i].answerChoices[j].text
            currForm.questions[i].answerChoices[j].nextQuId = propObj.questions[i].answerChoices[j].nextQuId
            currForm.questions[i].answerChoices[j].showAnswerLabelError = propObj.questions[i].answerChoices[j].showAnswerLabelError
          } else if (j > 0) {
            // if more than 1 answer Choice, then need to create others
            currForm.questions[i].answerChoices.push({
              answerId: propObj.questions[i].answerChoices[j].answerId,
              text: propObj.questions[i].answerChoices[j].text,
              nextQuId: propObj.questions[i].answerChoices[j].nextQuId,
              showAnswerLabelError: propObj.questions[i].answerChoices[j].showAnswerLabelError
            })
          }
        }
      }
      // Find values for tracking Id
      var lenQTrkId = Object.keys(propObj.qTrackingID).length
      for (k = 0; k < lenQTrkId; k++) {
        if (k === 0) {
          currForm.qTrackingID[k].quesID = propObj.qTrackingID[k].quesID
          currForm.qTrackingID[k].quesIndex = propObj.qTrackingID[k].quesIndex
        } else if (k > 0) {
          // if more than 1 answer Choice, then need to create others
          currForm.qTrackingID.push({
            quesID: propObj.qTrackingID[k].quesID,
            quesIndex: propObj.qTrackingID[k].quesIndex
          })
        }
      }
    },
    // Navigation Methods
    // Function called  by button click to return to form builder from Gen view. --> Pos-VIE 1
    goBack () {
      // On returning to its parent, the formViewer component will be destroyed
      this.$emit('returnToParent')
      this.showNextBtn = true
      this.showFinishBtn = false
      this.reset()
    },
    // Function called  by button click --> Pos-VIE 2
    toggleFinishBtn () {
      // Called to hide/show Next/Finish buttons
      this.showNextBtn = false
      this.showFinishBtn = true
    },
    // Function called  by button click --> Pos-VIE 3
    finishForm () {
      this.$q.notify('You have completed this form.')
      // Inform the parent that the formViewer has completed
      this.$emit('returnToParent')
    },
    // This function is called when the user clicks on the next button.  --> Pos-VIE 4
    nextTapped (quType) {
      var val = this.forms[this.currFIndex].ansRadioVal
      if ((val === '') && (quType === 'single')) {
        this.$q.notify('Please select an answer!')
      } else {
        // 1. If qType = single choice, perform search for answer choices. If qType =  freetext. Save Answer.
        if (quType === 'single') {
          this.searchAnsChoicesRadio(quType, val)
        } else if (quType === 'freetext') {
          // save answer
          var ansFreeId = ''
          var ansFreeTxt = this.forms[this.currFIndex].tempAnsHolder
          this.saveAnswers(ansFreeId, ansFreeTxt)
          this.searchNextQuestion(quType, null)
          this.forms[this.currFIndex].tempAnsHolder = ''
        }
        // Show the next question
        this.indexToShow = this.currQIndex
      }
    },
    // SEARCH METHODS
    // This function searches for the next question. Called by nextTapped (), searchAnsChoicesRadio () --> Pos-VIE 5
    searchNextQuestion (quType, questId) {
      // Algo for searching for next Question.
      var formIndex = this.currFIndex
      var questionIndex = this.currQIndex
      var nextQId = this.forms[formIndex].questions[questionIndex].nextDefaultId
      var nextQIdAns = questId // From radio choice by user
      switch (quType) {
        case 'freetext':
          // If FREETEXT, look for next Qu Id in order: Question --> Array of questions
          if (nextQId !== '') {
          // Check next question Id (END or PROCEED).
            this.checkNextQId(nextQId)
          } else {
          // No next Qu Id in Question ==> Get next available question from array of questions in qTrackingID.
            this.getNextFromQsList(questionIndex)
          }
          break
        case 'single':
          // If SINGLE. look for next Qu Id in order: Answer  --> Question --> Array of questions
          // 1. Answer has a next Qu Id in Ans Ch ==> use this for next (ANS Next QU ID)
          if (nextQIdAns !== '') {
          // Check next question Id (END or PROCEED)
            this.checkNextQId(nextQIdAns)
          } else if (nextQIdAns === '') {
          // 2. Answer has no next Qu Id ==> go to Parent Qu ID
            if (nextQId !== '') {
              // Check next question Id (END or PROCEED)
              this.checkNextQId(nextQId)
            } else {
            // No next Qu Id in Question ==> Get next available question from list of questions in qTrackingID.
              this.getNextFromQsList(questionIndex)
            }
          }
          break
      }
    },
    // This function searches the answerchoices for the one matching the radio button value.
    // Called for Single question type. --> Pos-VIE 6
    searchAnsChoicesRadio (quType, val) {
      // Returns the answer choice. Saved as answer. Next QuId is used.
      var ansChSe = this.forms[this.currFIndex].questions[this.currQIndex].answerChoices
      var foundAnsCh = ansChSe.find(ans => ans.answerId === val)
      var foundText = foundAnsCh.text
      var foundAnsId = foundAnsCh.answerId
      if (typeof foundAnsCh !== 'undefined') {
        // Save Answer choice in answers
        this.saveAnswers(foundAnsId, foundText)
        this.searchNextQuestion(quType, foundAnsCh.nextQuId)
        this.forms[this.currFIndex].ansRadioVal = ''
      } else if (typeof foundAnsCh === 'undefined') {
        this.$q.notify('There is an error. Please check your radio values. ')
      }
    },
    // This function gets the next available question from the question list.
    // Called by searchNextQuestion() --> Pos-VIE 7
    getNextFromQsList (indexPos) {
      // Use indexPos. If not last, call next question else call finish function.
      var lenQArray = Object.keys(this.forms[this.currFIndex].qTrackingID).length
      if (indexPos >= (lenQArray - 1)) {
        this.toggleFinishBtn()
      } else {
        indexPos++
        this.currQIndex = indexPos
      }
    },
    // This function gets the index of the next Question ID to display.
    // Called by checkNextQId() --> Pos-VIE 8
    getQuIdIndex (nextQId) {
      var foundQIn = this.forms[this.currFIndex].qTrackingID.find(track => track.quesID.toUpperCase().replace(/ /g, '') === nextQId.toUpperCase().replace(/ /g, ''))
      if (typeof foundQIn !== 'undefined') {
        const valIndexOfId = foundQIn.quesIndex
        this.currQIndex = valIndexOfId
      } else if (typeof foundQIn === 'undefined') {
        // NB: This means the index does not exist. See if this should trigger finish function. Send an alert to user.
        this.$q.notify('The next q ID index is undefined. ')
      }
    },
    // ANSWERS METHODS
    // This function allows answers input by the user to be added to the answers arrays. --> Pos-VIE 9
    saveAnswers (ansId, ansText) {
      var formIndex = this.currFIndex
      var questionIndex = this.currQIndex
      var savAnsInd = this.forms[formIndex].counterAnswers
      // Once index 0 is filled, will need to create a new answers object for any new one and fill that in. Increment Answers counter.
      if (savAnsInd === 0) {
        this.forms[formIndex].answers[savAnsInd].questionId = this.forms[formIndex].questions[questionIndex].qId
        this.forms[formIndex].answers[savAnsInd].answerText = ansText
        this.forms[formIndex].answers[savAnsInd].answerId = ansId
        this.forms[formIndex].answers[savAnsInd].timeStamp = this.timeStamp1(new Date(), 'en-gb')
        this.forms[formIndex].counterAnswers++
      } else if (savAnsInd > 0) {
        this.createAnswersObj(formIndex, questionIndex, ansId, ansText)
        this.forms[formIndex].counterAnswers++
      }
    },
    // This function creates new populated answers object. --> Pos-VIE 10
    createAnswersObj (formIndex, questionIndex, ansId, ansText) {
      this.forms[formIndex].answers.push({
        questionId: this.forms[formIndex].questions[questionIndex].qId,
        answerText: ansText,
        answerId: ansId,
        timeStamp: this.timeStamp1(new Date(), 'en-gb')
      })
    },
    // Misc methods
    // This function resets some variables and clears the answers array. --> Pos-VIE 11
    reset () {
      var fIn = this.currFIndex
      this.currFIndex = 0
      this.currQIndex = 0
      this.currAIndex = 0
      this.forms[fIn].answers = []
      this.forms[fIn].answers.push({
        questionId: '',
        answerText: '',
        answerId: '',
        timeStamp: ''
      })
      this.forms[fIn].counterAnswers = 0
    },
    // This function creates a timestamp for an answer --> Pos-VIE 12
    timeStamp1 (date, locale) {
      const event = (date === undefined) ? new Date() : new Date(date)
      return event.toLocaleDateString(locale) + ' ' + event.toLocaleTimeString(locale)
    },
    // TESTING METHODS
    // This function is called from the generated form and loads a JSON into forms[0] for testing. User still has to maually click submit in browser.  --> Pos-VIE 13
    testLoadJSON () {
      var tmpH = localStorage.getItem('testCOPDQ')
      var objTm = JSON.parse(tmpH)
      this.forms[this.currFIndex] = objTm
    }
  }
}
</script>
