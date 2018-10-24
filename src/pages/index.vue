<template>
  <q-page>
    <q-tabs color="secondary" glossy align="justify" v-model="selectedTab">
        <q-tab slot="title" default name="QDes" icon="subject" label="QDesign"/>
        <q-tab slot="title" v-if="tabWasLoaded" name="QDesPos" icon="subject" label="QDesignPost"/>
      <!-- QDes Tab -->
        <q-tab-pane name="QDes">
          <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title>Form Designer - New Model
              <span slot="subtitle">Design the form. Create the questions. Shape the flow with follow-up questions by ordering as desired.</span>
            </q-card-title>
            <q-btn class="q-ml-md" color="amber"  label="Start Again" @click="refreshPage"/>
            <q-card-separator class="q-mb-md q-mt-xl"/>
            <q-card-main>
      <!-- QDes - Forms  -->
            <div v-for="(form, fIndex) in forms" :key="form.id">
              <q-field class="q-mb-sm" label="Form Title: " helper="Please enter the title of the form. This IS displayed to the user.">
                <q-input v-model="form.fname" type="text" align="center" clearable />
              </q-field>
              <q-field class="q-mb-sm" label="Form Description: " helper="Please enter a description for the form. This IS displayed to the user.">
                <q-input v-model="form.fDescription" type="textarea" rows="5" align="center" clearable />
              </q-field>
              <!-- <q-btn class="q-mt-sm" label="Add More Questions" color="blue" icon="add" @click="addRowQuestions(fIndex)" /> -->
              <q-card-separator class="q-mb-md q-mt-lg"/>
      <!-- QDes - Questions -->
        <q-card class="bg-teal-1 q-mt-md q-mb-md">
           <div v-for="(question, qIndex) in form.questions" :key="question.id">
             <q-card-separator class="q-mb-md q-mt-lg"/>
            <div class="row">
              <div class="col-6">
                <q-btn class="q-mb-md q-ml-sm" label="Add More Questions" color="blue" icon="add" @click="addRowQuestions(fIndex)" />
              </div>
              <div class="col-6">
                <q-btn class="q-mb-md q-mr-sm" v-show="qIndex !==0" color="red-3" icon="remove" label="Remove this question" @click="remRowQs(fIndex, qIndex)" />
              </div>
            </div>
            <q-field class="q-mb-sm q-mt-sm q-ml-sm q-mr-sm" label="Question ID: " helper="This automatically generated Question ID is editable. It is a REQUIRED field and must be UNIQUE. This IS displayed to the user.">
              <q-input v-model="question.qId" type="text" align="center" @input="updtQTrk(fIndex, qIndex)"/>
                <div v-show="question.showQIdError === true">
                  <p style="color:red;">This field must be filled and unique.</p>
                </div>
            </q-field>
            <q-field class="q-mb-sm q-mt-md q-ml-sm q-mr-sm" label="Question Type: " helper="Please select a question type. This IS NOT displayed to the user and is for INTERNAL use only.">
              <q-select v-model="question.qType" :options="form.quSelOptions" />
            </q-field>
            <q-field class="q-mb-sm q-ml-sm q-mr-sm" label="Question: " helper="Please enter a question. This IS displayed to the user.">
              <q-input v-model="question.qtext" type="textarea" rows="6" align="center" clearable />
            </q-field>
            <q-field class="q-mb-sm q-ml-sm q-mr-sm" label="Help: " helper="Please enter a description for any helper label. This IS displayed to the user.">
              <q-input v-model="question.qHelp" type="text" align="center" clearable />
            </q-field>
             <q-field class="q-mb-sm q-ml-sm q-mr-sm" label="Default/Next Question ID: " helper="Please enter the next Question ID to proceed. Terminate the form either with the keyword ENDFORM or enter -1. This IS NOT displayed to the user and is for INTERNAL use only.">
              <q-input v-model="question.nextDefaultId" type="text" align="center" clearable />
                <div v-show="question.showNextQIdError === true">
                  <p style="color:red;">This Question ID does not exist.</p>
                </div>
            </q-field>
            <div  v-show="question.qType !== 'freetext'">
            <q-card-separator class="q-mb-md q-mt-lg"/>
            <q-btn class="q-ml-sm q-mt-sm" color="green" label="Add More Answers" icon="add" @click="addAnswerChoices(fIndex, qIndex)" />
            </div>
      <!-- QDes - Answers -->
          <q-card class="bg-green-2 q-ml-md q-mt-lg q-mb-md q-mr-md">
            <div  v-show="question.qType !== 'freetext'">
              <div v-for="(answerChoice, aIndex) in question.answerChoices" :key="answerChoice.id">
                <!-- <q-btn class="q-mb-md" round size="sm" color="green" icon="add" @click="addAnswerChoices(fIndex, qIndex, aIndex)" /> -->
                <q-btn class="q-mb-md q-ml-md" v-show="aIndex !==0" color="green-3" icon="remove" label="Remove this answer" @click="remRowAns(fIndex, qIndex, aIndex)" />
                <q-field class="q-mb-sm q-ml-sm q-mt-lg q-mr-sm" label="Answer Label: " helper="This Answer label is editable. This IS NOT displayed to the user and is for INTERNAL use only.." >
                  <q-input v-model="answerChoice.answerId" type="text" align="center" clearable/>
                    <div v-show="answerChoice.showAnswerLabelError === true">
                      <p style="color:red;">This field must be filled and unique.</p>
                    </div>
                </q-field>
                <q-field class="q-mb-sm q-ml-sm q-mr-sm" label="Answer Text: " helper="Please enter the answer text. e.g. Yes or No. This IS displayed to the user.">
                  <q-input v-model="answerChoice.text" type="text" align="center" clearable />
                </q-field>
                <q-field class="q-mb-sm q-ml-sm q-mr-sm" label="Next Question ID: " helper="Please enter the next Question ID to proceed. Terminate the form either with the keyword ENDFORM or enter -1. This IS NOT displayed to the user and is for INTERNAL use only." >
                  <q-input v-model="answerChoice.nextQuId" type="text" align="center" clearable />
                </q-field>
                <q-card-separator class="q-mb-md q-mt-lg"/>
              </div>
            </div>
          </q-card>
           </div>
          </q-card>
           </div>
            </q-card-main>
            <div class="row">
              <div class="col-6">
                <q-btn class="q-mb-md q-ml-md" color="orange" icon-right="save" @click="saveForm">Save the form locally</q-btn>
              </div>
              <div class="col-1"></div>
              <div class="col-5">
                <q-btn class="q-mb-md q-mr-md" color="red" icon-right="navigate_next" @click="genFormTapped">Generate the form</q-btn>
              </div>
              <!-- <q-btn class="q-mb-md" color="red" icon-right="navigate_next" @click="generateForm">Generate the form</q-btn> -->
            </div>
          <div v-show="showGenError=== true">
            <p style="border:3px; border-style:solid;padding: 1em;color:red;">There are errors in this form. Please review that the following fields are valid: question, answer and next question. You won't be able to proceed until this is done.</p>
          </div>
          </q-card>
        </q-tab-pane>
      <!-- QDesPos Tab -->
        <q-tab-pane name="QDesPos">
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
        </q-tab-pane>
      </q-tabs>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      currFIndex: 0,
      currQIndex: 0,
      currAIndex: 0,
      indexToShow: 0,
      selectedTab: 'QDes',
      showGenError: false,
      showNextBtn: true,
      showFinishBtn: false,
      tabWasLoaded: false,
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
          arrayGenQChk: [],
          counterGenQuID: 0,
          counterAnswers: 0,
          fDescription: '',
          fname: '',
          questions: [
            {
              qtext: '',
              qHelp: '',
              qId: 'Initial Question',
              nextDefaultId: '',
              qType: 'freetext',
              answerChoices: [
                {
                  answerId: 'Answer 1',
                  text: '',
                  nextQuId: '',
                  showAnswerLabelError: false
                }
              ],
              ansTrackingID: [
                {
                  ansID: 'Answer 1',
                  ansIndex: 0
                }
              ],
              counterAnsChID: 0,
              showNextQIdError: false,
              showQIdError: false
            }
          ],
          qTrackingID: [
            {
              quesID: 'Initial Question',
              quesIndex: 0
            }
          ],
          quSelOptions: [
            {
              label: 'Freetext',
              value: 'freetext'
            },
            // {
            //   label: 'Multiple choice',
            //   value: 'multi'
            // },
            {
              label: 'Single choice',
              value: 'single'
            }
          ],
          tempAnsHolder: '',
          trackQuID: ''
        }
      ]
    }
  },
  methods: {
    // Add Remove Functions Section
    // This function allows questions to be added.
    addRowQuestions (fIndex) {
      this.forms[fIndex].counterGenQuID++
      this.forms[fIndex].questions.push({
        qtext: '',
        qHelp: '',
        qId: 'Question ' + this.forms[fIndex].counterGenQuID,
        nextDefaultId: '',
        qType: 'freetext',
        answerChoices: [
          {
            answerId: 'Answer 1',
            text: '',
            nextQuId: '',
            showAnswerLabelError: false
          }
        ],
        ansTrackingID: [
          {
            ansID: 'Answer 1',
            ansIndex: 0
          }
        ],
        counterAnsChID: 0,
        showNextQIdError: false,
        showQIdError: false
      })
      this.addTrackQuId(fIndex)
    },
    // This function allows answer choices per question to be added.
    addAnswerChoices (fIndex, qIndex) {
      this.forms[fIndex].questions[qIndex].counterAnsChID++
      var newAnsLabel = this.forms[fIndex].questions[qIndex].counterAnsChID + 1
      this.forms[fIndex].questions[qIndex].answerChoices.push({
        answerId: 'Answer ' + newAnsLabel,
        text: '',
        nextQuId: '',
        showAnswerLabelError: false
      })
      this.addTrackAnsId(fIndex, qIndex)
    },
    // This function allows the selected question to be removed.
    remRowQs (fIndex, qIndex) {
      this.forms[fIndex].questions.splice(qIndex, 1)
      // remove the selected index from the question tracking Array
      this.forms[fIndex].qTrackingID.splice(qIndex, 1)
      // In the tracking array, update the question index for those removed AFTER SPLICE
      var lengthOfTrackerAfterSplice = Object.keys(this.forms[fIndex].qTrackingID).length
      if (qIndex < lengthOfTrackerAfterSplice) {
      // If qIndex is NOT LAST, then from qIndex position till last, subtract 1 from values of quesIndex
        var i
        for (i = qIndex; i < lengthOfTrackerAfterSplice; i++) {
          var fn = this.forms[fIndex].qTrackingID[i].quesIndex - 1
          this.forms[fIndex].qTrackingID[i].quesIndex = fn
        }
      }
    },
    // This function allows the selected answer to be removed.
    remRowAns (fIndex, qIndex, aIndex) {
      var pos = this.forms[fIndex].questions[qIndex]
      pos.answerChoices.splice(aIndex, 1)
      // remove the selected index from the answer tracking Array
      pos.ansTrackingID.splice(aIndex, 1)
      // In the tracking array, update the question index for those removed AFTER SPLICE
      var lengthOfTrackerAfterSplice = Object.keys(pos.ansTrackingID).length
      if (aIndex < lengthOfTrackerAfterSplice) {
      // If aIndex is NOT LAST, then from aIndex position till last, subtract 1 from values of ansIndex
        var i
        for (i = aIndex; i < lengthOfTrackerAfterSplice; i++) {
          var fn = pos.ansTrackingID[i].ansIndex - 1
          pos.ansTrackingID[i].ansIndex = fn
        }
      }
    },
    // Navigation Methods
    // Function called when generating form. If validation passes, call generateForm ()
    genFormTapped () {
      // Only true if both Q and A are true
      if (this.checkGenQ() === true) {
        this.generateForm()
      }
    },
    generateForm () {
      this.selectedTab = 'QDesPos'
      this.tabWasLoaded = true
      this.indexToShow = 0
    },
    goBack () {
      this.selectedTab = 'QDes'
      this.tabWasLoaded = false
      this.showNextBtn = true
      this.showFinishBtn = false
      this.currFIndex = 0
      this.currQIndex = 0
      this.currAIndex = 0
      this.forms[this.currFIndex].counterAnswers = 0
    },
    toggleFinishBtn () {
      // Called to hide/show Next/Finish buttons
      this.showNextBtn = false
      this.showFinishBtn = true
    },
    finishForm () {
      this.$q.notify('Arrived at finish stage!')
    },
    // This function is called when the user clicks on the next button.
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
    // This function searches for the next question. Called by nextTapped (), searchAnsChoicesRadio ()
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
    // This function searches the answerchoices for the one matching the radio button value. Called for Single question type.
    // Returns the answer choice. Saved as answer. Next QuId is used.
    searchAnsChoicesRadio (quType, val) {
      var ansChSe = this.forms[this.currFIndex].questions[this.currQIndex].answerChoices
      var foundAnsCh = ansChSe.find(ans => ans.answerId === val)
      var foundText = foundAnsCh.text
      var foundAnsId = foundAnsCh.answerId
      console.log('Found Ans Ch is via: ', foundAnsCh)
      if (typeof foundAnsCh !== 'undefined') {
        // Save Answer choice in answers
        this.saveAnswers(foundAnsId, foundText)
        this.searchNextQuestion(quType, foundAnsCh.nextQuId)
        this.forms[this.currFIndex].ansRadioVal = ''
      } else if (typeof foundAnsCh === 'undefined') {
        // NB: This means the index does not exist. Error Condition. Send an alert to user. ----> 1
        this.$q.notify('There is an error. Please check your radio values. ')
      }
    },
    // This function gets the next available question from the question list. Called by searchNextQuestion()
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
    // This function gets the index of the next Question ID to display. Called by checkNextQId()
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
    // TRACKING ARRAYS METHODS
    // This function updates the Question tracking index. Called by addRowQuestions().
    addTrackQuId (fIndex) {
      var qObj = this.forms[fIndex].questions
      // to get last index, need length of object as we always add to last index
      var lastIndexQObj = Object.keys(qObj).length - 1
      this.forms[fIndex].qTrackingID.push({
        quesID: this.forms[fIndex].questions[lastIndexQObj].qId,
        quesIndex: lastIndexQObj
      })
    },
    // This function updates the Answer tracking index. Called by addAnswerChoices()
    addTrackAnsId (fIndex, qIndex) {
      var aObj = this.forms[fIndex].questions[qIndex].answerChoices
      // to get last index, need length of object as we always add to last index
      var lastIndexAObj = Object.keys(aObj).length - 1
      // this.$q.notify('Final index in  questions: ' + lastIndexQObj)
      this.forms[fIndex].questions[qIndex].ansTrackingID.push({
        ansID: this.forms[fIndex].questions[qIndex].answerChoices[lastIndexAObj].answerId,
        ansIndex: lastIndexAObj
      })
    },
    // This function is called to update the qTrackingID.
    updtQTrk (fIndex, qIndex) {
      // on user updating the question.qId model
      this.forms[fIndex].qTrackingID[qIndex].quesID = this.forms[fIndex].questions[qIndex].qId
    },
    // ANSWERS METHODS
    // This function allows answers input by the user to be added to the answers arrays.
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
    // This function creates new populated answers object.
    createAnswersObj (formIndex, questionIndex, ansId, ansText) {
      this.forms[formIndex].answers.push({
        questionId: this.forms[formIndex].questions[questionIndex].qId,
        answerText: ansText,
        answerId: ansId,
        timeStamp: this.timeStamp1(new Date(), 'en-gb')
      })
    },
    // Misc methods
    refreshPage () {
      location.reload(true)
    },
    timeStamp1 (date, locale) {
      const event = (date === undefined) ? new Date() : new Date(date)
      return event.toLocaleDateString(locale) + ' ' + event.toLocaleTimeString(locale)
    },
    // This function checks the next Qu Id to either end or proceed. Called by searchNextQuestion().
    checkNextQId (qIdCheck) {
      // if there is a keyword, call finish. Otherwise proceed to get next question id
      if (qIdCheck.toUpperCase() === 'ENDFORM' || qIdCheck === '-1') {
        this.toggleFinishBtn()
      } else if (qIdCheck !== '') {
        // ?? NB: To add a check here for a valid next question Id. REMOVE WHEN DONE ---> 1
        // If the check returns a valid one call this.getQuIdIndex for next Qu Id (can add e.g remove space in string for comparison)
        this.getQuIdIndex(qIdCheck)
      }
    },
    // Validation Methods - Fields
    checkFieldQuId (fIndex, qIndex) {
      var fieldQId = this.forms[fIndex].questions[qIndex].qId
      if (fieldQId !== '') {
        this.updtQTrk(fIndex, qIndex)
      } else {
        // fire error via either notify or display v-show
      }
    },
    // This function runs checks on the question id. Flags false. Called by generateForm()
    checkGenQ: function () {
      // ALGO
      var arrTk = this.forms[this.currFIndex].qTrackingID
      var i, j
      var lenA = arrTk.length
      var errA = [] // Combines empty and duplicates quID
      // 1. Check if QuId is empty first . Check each ques Id against the rest of the tracking array
      // If Empty insert into errorArray, skip to next question id in index. If no issue, then go to 2
      // 2. Check if QuId is unique.If Not Unique insert into errorArray.
      // 3. Check if next QID  exists
      // 4. Complete through whole tracking array
      // if length of error array is not 0, return false See if can return the indices as well
      // IF either duplicate quId or next QId does not exist return false
      for (i = 0; i < lenA; i++) {
        var name = arrTk[i].quesID.toUpperCase().replace(/ /g, '')
        if (name === '') {
          errA.push(arrTk[i].quesIndex)
        } else {
          for (j = i + 1; j < lenA; j++) {
            var name2 = arrTk[j].quesID.toUpperCase().replace(/ /g, '')
            if ((name2 !== '') && (name === name2)) {
              errA.push(arrTk[j].quesIndex)
            }
          }
        }
      }
      // console.log('After Push B4, errC is: ', errA)
      errA = [...new Set(errA)]
      // If there is any duplicate or empty QU ID field, return false. To add for missing next QU ID yet
      if (errA.length > 0) {
        return false
      } else {
        return true
      }
    },
    // TESTING METHODS
    // This function is called from the design form and saves a newly created JSON into a local file for testing.
    saveForm () {
      const jsonData = JSON.stringify(this.forms[this.currFIndex])
      console.log('jSON Data is: ', jsonData)
      localStorage.setItem('testCOPDQ', jsonData)
    },
    // This function is called from the generated form and loads a JSON into forms[0] for testing. User still has to maually click submit in browser.
    testLoadJSON () {
      var tmpH = localStorage.getItem('testCOPDQ')
      var objTm = JSON.parse(tmpH)
      this.forms[this.currFIndex] = objTm
    },
    // Radio selected only for TESTING. TO BE MADE REDUNDANT
    radioSelected () {
      this.$q.notify('The value from radio is: ' + this.forms[this.currFIndex].ansRadioVal)
    }
  }
}
</script>
