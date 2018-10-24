<template>
    <q-card class="bg-white q-ma-xl">
        <q-card-main>
        <!-- QDes - Forms  -->
             <q-field class="q-mb-sm" label="Form Title Prop: " helper="Please enter the title of the form. This IS displayed to the user.">
                <q-input v-model="form.fname" type="text" align="center" clearable />
            </q-field>
            <q-field class="q-mb-sm" label="Form Description: " helper="Please enter a description for the form. This IS displayed to the user.">
                <q-input v-model="form.fDescription" type="textarea" rows="5" align="center" clearable />
            </q-field>
            <q-card-separator class="q-mb-md q-mt-lg"/>
        <!-- QDes - Questions -->
        <q-card class="bg-teal-1 q-mt-md q-mb-md">
           <div v-for="(question, qIndex) in form.questions" :key="question.id">
             <q-card-separator class="q-mb-md q-mt-lg"/>
            <div class="row">
              <div class="col-6">
                <q-btn class="q-mb-md q-ml-sm" label="Add More Questions" color="blue" icon="add" @click="addRowQuestions()" />
              </div>
              <div class="col-6">
                <q-btn class="q-mb-md q-mr-sm" v-show="qIndex !==0" color="red-3" icon="remove" label="Remove this question" @click="remRowQs(qIndex)" />
              </div>
            </div>
            <q-field class="q-mb-sm q-mt-sm q-ml-sm q-mr-sm" label="Question ID: " helper="This automatically generated Question ID is editable. It is a REQUIRED field and must be UNIQUE. This IS displayed to the user.">
              <q-input v-model="question.qId" type="text" align="center" @input="updtQTrk(qIndex)"/>
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
            <q-btn class="q-ml-sm q-mt-sm" color="green" label="Add More Answers" icon="add" @click="addAnswerChoices(qIndex)" />
            </div>
      <!-- QDes - Answers -->
          <q-card class="bg-green-2 q-ml-md q-mt-lg q-mb-md q-mr-md">
            <div  v-show="question.qType !== 'freetext'">
              <div v-for="(answerChoice, aIndex) in question.answerChoices" :key="answerChoice.id">
                <q-btn class="q-mb-md q-ml-md" v-show="aIndex !==0" color="green-3" icon="remove" label="Remove this answer" @click="remRowAnsCh(qIndex, aIndex)" />
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
        <!-- QDes - final section -->
          <div class="row">
              <div class="col-6">
                <q-btn class="q-mb-md q-ml-md" color="orange" icon-right="save" @click="saveFormTapped">Save the form</q-btn>
              </div>
              <div class="col-0"></div>
              <div class="col-6">
                <q-btn class="float-right q-mb-md q-mr-md" color="red" icon-right="navigate_next" @click="formPreviewTapped">Form Preview</q-btn>
              </div>
            </div>
        </q-card-main>
    </q-card>
</template>

<script>
export default {
  data () {
    return {
      form:
        {
          counterGenQuID: 0,
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
              ],
              ansChTrkID: [
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
            {
              label: 'Single choice',
              value: 'single'
            }
          ],
          trackQuID: ''
        }
    }
  },
  methods: {
    // Add Remove Functions Section
    // This function allows questions to be added. --> Pre-GEN 1
    addRowQuestions () {
      this.form.counterGenQuID++
      this.form.questions.push({
        qtext: '',
        qHelp: '',
        qId: 'Question ' + this.form.counterGenQuID,
        nextDefaultId: '',
        qType: 'single',
        answerChoices: [
          {
            answerId: 'Answer 1',
            text: '',
            nextQuId: '',
            showAnswerLabelError: false
          }
        ],
        ansChTrkID: [
          {
            ansID: 'Answer 1',
            ansIndex: 0
          }
        ],
        counterAnsChID: 0,
        showNextQIdError: false,
        showQIdError: false
      })
      this.addTrackQuId()
    },
    // This function allows answer choices per question to be added. --> Pre-GEN 2
    addAnswerChoices (qIndex) {
      this.form.questions[qIndex].counterAnsChID++
      var newAnsLabel = this.form.questions[qIndex].counterAnsChID + 1
      this.form.questions[qIndex].answerChoices.push({
        answerId: 'Answer ' + newAnsLabel,
        text: '',
        nextQuId: '',
        showAnswerLabelError: false
      })
      this.addTrackAnsChId(qIndex)
    },
    // This function allows the selected question to be removed. --> Pre-GEN 3
    remRowQs (qIndex) {
      this.form.questions.splice(qIndex, 1)
      // remove the selected index from the question tracking Array
      this.form.qTrackingID.splice(qIndex, 1)
      // In the tracking array, update the question index for those removed AFTER SPLICE
      var lengthOfTrackerAfterSplice = Object.keys(this.form.qTrackingID).length
      if (qIndex < lengthOfTrackerAfterSplice) {
      // If qIndex is NOT LAST, then from qIndex position till last, subtract 1 from values of quesIndex
        var i
        for (i = qIndex; i < lengthOfTrackerAfterSplice; i++) {
          var fn = this.form.qTrackingID[i].quesIndex - 1
          this.form.qTrackingID[i].quesIndex = fn
        }
      }
    },
    // This function allows the selected answer to be removed. --> Pre-GEN 4
    remRowAnsCh (qIndex, aIndex) {
      var pos = this.form.questions[qIndex]
      pos.answerChoices.splice(aIndex, 1)
      // remove the selected index from the answer tracking Array
      pos.ansChTrkID.splice(aIndex, 1)
      // In the tracking array, update the question index for those removed AFTER SPLICE
      var lengthOfTrackerAfterSplice = Object.keys(pos.ansChTrkID).length
      if (aIndex < lengthOfTrackerAfterSplice) {
      // If aIndex is NOT LAST, then from aIndex position till last, subtract 1 from values of ansIndex
        var i
        for (i = aIndex; i < lengthOfTrackerAfterSplice; i++) {
          var fn = pos.ansChTrkID[i].ansIndex - 1
          pos.ansChTrkID[i].ansIndex = fn
        }
      }
    },
    // Navigation Methods
    // This is called when clicking on Form Preview. If validation passes runCheckOnForm(), call openFormViewer() --> Pre-GEN 5
    formPreviewTapped () {
      if (this.runCheckOnForm() === true) {
        this.emitToParentObj()
        this.openFormViewer()
      }
    },
    // Function called for form validation before saving or generating Form Viewer. --> Pre-GEN 6
    runCheckOnForm: function () {
      // Get following error arrays: [errNxtQu, errAnChNx, errAnChLab], errQu
      // Get length of error array. Proceed to generate form ONLY IF all error arrays are false (i.e. length of 0)
      var errQu = this.checkGenQ()
      var errCheckNextDefId = this.checkNextDefId()
      var errNxtQu = errCheckNextDefId[0]
      var errAnChNx = errCheckNextDefId[1]
      var errAnChLab = errCheckNextDefId[2]

      var lenErrQu = errQu.length
      var lenErrNxtQu = errNxtQu.length
      var lenErrAnChNx = errAnChNx.length
      var lenErrAnChLab = errAnChLab.length
      var checkFormTitleFailed = false
      // If the Form title isn't filled in, set flag checkFormTitleFailed to true
      if (this.form.fname === '') {
        checkFormTitleFailed = true
      }

      if ((lenErrQu > 0) || (lenErrNxtQu > 0) || (lenErrAnChNx > 0) || (lenErrAnChLab > 0) || (checkFormTitleFailed === true)) {
        // send index for error msgs??
        return false
      } else {
        return true
      }
    },
    // TRACKING ARRAYS METHODS
    // This function updates the Question tracking index. Called by addRowQuestions(). --> Pre-GEN 7
    addTrackQuId () {
      var qObj = this.form.questions
      // to get last index, need length of object as we always add to last index
      var lastIndexQObj = Object.keys(qObj).length - 1
      this.form.qTrackingID.push({
        quesID: this.form.questions[lastIndexQObj].qId,
        quesIndex: lastIndexQObj
      })
    },
    // This function updates the Answer tracking index. Called by addAnswerChoices() --> Pre-GEN 8
    addTrackAnsChId (qIndex) {
      var aObj = this.form.questions[qIndex].answerChoices
      // to get last index, need length of object as we always add to last index
      var lastIndexAObj = Object.keys(aObj).length - 1
      this.form.questions[qIndex].ansChTrkID.push({
        ansID: this.form.questions[qIndex].answerChoices[lastIndexAObj].answerId,
        ansIndex: lastIndexAObj
      })
    },
    // This function is called to update the qTrackingID. --> Pre-GEN 9
    updtQTrk (qIndex) {
      // on user updating the question.qId model
      this.form.qTrackingID[qIndex].quesID = this.form.questions[qIndex].qId
    },
    // Check Methods
    // This function checks the next Qu Id to either end or proceed.
    // Called by searchNextQuestion().  --> Pre-GEN 10
    checkNextQId (qIdCheck) {
      // if there is a keyword, call finish. Otherwise proceed to get next question id
      if (qIdCheck.toUpperCase() === 'ENDFORM' || qIdCheck === '-1') {
        this.toggleFinishBtn()
      } else if (qIdCheck !== '') {
        // If the check returns a valid one call this.getQuIdIndex for next Qu Id (can add e.g remove space in string for comparison)
        this.getQuIdIndex(qIdCheck)
      }
    },
    // Validation Methods - Fields
    // This function checks if the question id is empty or a duplicate. Flags false.
    // Called by genFormTapped()  --> Pre-GEN 11
    checkGenQ: function () {
      // ALGO --> If either next QuesId does not exist or is duplicate, return false
      var arrTk = this.form.qTrackingID
      var i, j
      var lenA = arrTk.length
      var errQu = [] // // Stores index of question for empty or duplicate Ans Cho labels
      for (i = 0; i < lenA; i++) {
        var name = arrTk[i].quesID.toUpperCase().replace(/ /g, '')
        // 1. Check if QuId is empty first . Check each ques Id against the rest of the tracking array
        // If Empty insert into errorArray, skip to next question id in index. If no issue, then go to 2
        if (name === '') {
          errQu.push({index: arrTk[i].quesIndex})
        } else {
          // 2. Check if QuId is unique.If Not Unique insert into errorArray.
          // 3. Check if next QID  exists
          for (j = i + 1; j < lenA; j++) {
            var name2 = arrTk[j].quesID.toUpperCase().replace(/ /g, '')
            if ((name2 !== '') && (name === name2)) {
              errQu.push({index: arrTk[j].quesIndex})
            }
          }
        }
      }
      errQu = Array.from(new Set(errQu.map(JSON.stringify))).map(JSON.parse)
      return errQu
    },
    // This function checks if the next def Q ID exists for Questions and Answer Choices  --> Pre-GEN 12
    checkNextDefId: function () {
      // 1. use defId from questions.defaultId. Cycle through questions []
      // 2. For each question, get the def id. Check this against the tracking q id. Also check for infinite loop.
      // 3. If the next def id doesn't exist, then in error array, add the index of the question
      var quArr = this.form.questions
      var arrTk = this.form.qTrackingID
      var lenQ = quArr.length
      var lenA = arrTk.length
      var errNxtQu = [] // Stores index of question for non-existent or looping next def id
      var errAnChNx = [] // Stores index of question and answer choice for non-existent or looping next q id
      var errAnChLab = [] // Stores index of question and answer choice for empty or duplicate Ans Cho labels
      var i, j, k
      // check in arr of q
      for (i = 0; i < lenQ; i++) {
        var fieldDefQId = quArr[i].nextDefaultId.toUpperCase().replace(/ /g, '')
        if (fieldDefQId !== '') {
          // Check for infinite loop (Next Q Id = Current Q Id)
          if (fieldDefQId === quArr[i].qId) {
            errNxtQu.push({index: i})
          } else {
            // Check Next Default Id for each Q against  Q tracking
            for (j = 0; j < lenA; j++) {
              var nameQId = arrTk[j].quesID.toUpperCase().replace(/ /g, '')
              if (fieldDefQId !== nameQId) {
                errNxtQu.push({index: i})
              }
            }
          }
        }
        // Check Next Question Id of Answer Choice for each Question
        var ansChArr = this.form.questions[i].answerChoices
        var lenAn = ansChArr.length
        for (k = 0; k < lenAn; k++) {
          var fieldNxtId = ansChArr[k].nextQuId.toUpperCase().replace(/ /g, '')
          if (fieldNxtId !== '') {
            // Check for infinite loop (Next Q Id = Current Q Id)
            if (fieldNxtId === quArr[i].qId) {
              errNxtQu.push(i)
            } else {
              // Check Next Question Id vs QTracking
              for (j = 0; j < lenA; j++) {
                var nameQId2 = arrTk[j].quesID.toUpperCase().replace(/ /g, '')
                if (fieldNxtId !== nameQId2) {
                  errAnChNx.push({quId: i, indexOfAnsCh: k})
                }
              }
            }
          }
          // For every answer Choice, check if the answer label is empty is empty or a duplicate
          errAnChLab = this.checkAnsCh(i, ansChArr, lenAn, errAnChLab)
        }
      }
      errNxtQu = Array.from(new Set(errNxtQu.map(JSON.stringify))).map(JSON.parse)
      errAnChNx = Array.from(new Set(errAnChNx.map(JSON.stringify))).map(JSON.parse)
      return [errNxtQu, errAnChNx, errAnChLab]
    },
    // This function checks if the answer choice label is empty or unique.
    // Returns an error array. Called by checkNextDefId()  --> Pre-GEN 13
    checkAnsCh: function (i, ansChArr, lenAn, errAnsChLab) {
      // ALGO --> If either duplicate Ans Label or next QId does not exist, return error array with empty and duplicates Answer Label
      var j, k
      // For each Answer Choice
      for (j = 0; j < lenAn; j++) {
        var labelAns = ansChArr[j].answerId.toUpperCase().replace(/ /g, '')
        if (labelAns === '') {
          errAnsChLab.push({quId: i, indexOfAnsCh: j})
        } else {
          // Comparison with other answer labels to find if answer label is unique
          for (k = j + 1; k < lenAn; k++) {
            var compareLabelName = ansChArr[k].answerId.toUpperCase().replace(/ /g, '')
            if ((compareLabelName !== '') && (compareLabelName === labelAns)) {
              // Give index of duplicate found
              errAnsChLab.push({quId: i, indexOfAnsCh: k})
            }
          }
        }
      }
      errAnsChLab = [...new Set(errAnsChLab)]
      if (errAnsChLab.length > 0) {
        errAnsChLab = Array.from(new Set(errAnsChLab.map(JSON.stringify))).map(JSON.parse)
        return errAnsChLab
      } else {
        return errAnsChLab
      }
    },
    // Misc methods
    // This function refreshes the page  --> Pre-GEN 14
    refreshPage () {
      location.reload(true)
    },
    emitToParentObj () {
      this.$emit('chiObjForm', this.form)
    },
    openFormViewer () {
      this.$emit('emitOpenFormViewer')
    },
    // TESTING METHODS
    // This function is called from the design form
    // and saves a newly created JSON into a local file for testing. --> Pre-GEN 15
    saveFormTapped () {
      this.runCheckOnForm()
      if (this.runCheckOnForm() === true) {
        this.emitToParentObj()
        const jsonData = JSON.stringify(this.form)
        console.log('jSON Data is: ', jsonData)
        localStorage.setItem('testCOPDQ', jsonData)
      } else {
        this.$q.notify('Errors abound')
      }
    }
  }
}
</script>
