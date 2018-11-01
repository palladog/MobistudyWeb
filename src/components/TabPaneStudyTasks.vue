<template>
  <div>
    <q-tab-pane name="tab-tasks">
      <q-card class="form-card">
        <q-card-title>Tasks</q-card-title>
        <q-card-main>
          <q-btn-dropdown split label="Add task">
            <!-- dropdown content -->
            <q-list link>
              <q-item v-close-overlay @click.native="addDT()">
                <q-item-main>
                  <q-item-tile label>Data query Task</q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-close-overlay @click.native="addFormT()">
                <q-item-main>
                  <q-item-tile label>Form</q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn label="Create new Form" @click="createForm()"/>
          <q-btn label="Simulate Form" @click="openFormSimulator()"/>
        </q-card-main>
      </q-card>
      <!-- Tasks -->
      <q-card  v-for="(task, index) in tasks" :key="index" class="form-card">
        <q-card-title v-if="task.type === 'dataQuery'">
          Data Query Task
        </q-card-title>
        <q-card-title v-if="task.type === 'form'">
          Form Task
        </q-card-title>
        <q-card-main>
          <q-field v-if="task.type === 'dataQuery'" label="Data type:">
            <q-select color="secondary"  v-model="task.dataType"  :options="selectOptionsDataTypeForQuery" placeholder="Please select the data type to be collected."/>
          </q-field>
          <q-btn v-if="task.type === 'form'" label="Create new Form" @click="createForm()"/>
          <q-field v-if="task.type === 'form'" label="Form:" helper="Please select the form to be shown.">
            <q-select color="secondary" v-model="task.formKey" :options="selectOptionsFormsList" @input="changeFormName(task, $event)"/>
          </q-field>
          <q-field class="q-mt-lg" label="Scheduling:" helper="Use the triangle to show or hide the information.">
            <q-collapsible icon="calendar_today" :label="schedulingToString(task.scheduling)" disable>
              <scheduler v-model="task.scheduling"></scheduler>
            </q-collapsible>
          </q-field>
          <q-btn label="Remove this task" color="negative" icon="remove" @click="removeTask(index)"/>
        </q-card-main>
      </q-card>
    </q-tab-pane>

    <formbuilder ref="formbuilder" v-model="newForm" @simulateForm="openFormSimulator()"></formbuilder>
    <formsimulator ref="formsimulator" :form='newForm' @closed="openFormBuilder()"></formsimulator>
  </div>
</template>

<script>
import Scheduler from 'components/CardScheduler.vue'
import { schedulingToString } from '../data/Scheduling.js'
import API from '../data/API.js'
import FormBuilder from 'components/ModalFormBuilder.vue'
import FormSimulator from 'components/ModalFormSimulator.vue'
import QueryDataTypeEnum from '../data/QueryDataTypeEnum.js'

export default {
  components: {
    'scheduler': Scheduler,
    'formbuilder': FormBuilder,
    'formsimulator': FormSimulator
  },
  name: 'TabPaneStudyTasks',
  props: [ 'tasks' ],
  data () {
    return {
      selectOptionsFormsList: [],
      newForm: {
        name: undefined,
        description: undefined,
        questions: [{
          id: 'Q1',
          text: undefined,
          helper: undefined,
          type: 'freetext',
          nextDefaultId: undefined,
          answerChoices: [{
            id: 'Q1A1',
            text: undefined,
            nextQuestionId: undefined
          }]
        }]
      },
      selectOptionsDataTypeForQuery: QueryDataTypeEnum.values.map((v) => {
        return {
          label: QueryDataTypeEnum.valueToString(v),
          value: v
        }
      })
    }
  },
  async created () {
    this.getForms()
  },
  methods: {
    async getForms () {
      try {
        let forms = await API.getFormsList()
        this.selectOptionsFormsList = forms.map((f) => {
          return {
            label: f.name,
            value: f._key
          }
        })
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Cannot retrieve the forms. Check the connection and reload the page.',
          icon: 'report_problem'
        })
      }
    },
    schedulingToString (sc) {
      return schedulingToString(sc)
    },
    addDT () {
      this.tasks.push({
        id: this.tasks.length + 1,
        type: 'dataQuery',
        scheduling: {
          startEvent: 'consent',
          startDelaySecs: undefined,
          untilSecs: undefined,
          occurrences: undefined,
          intervalType: 'd',
          interval: 1,
          months: [],
          monthDays: [],
          weekDays: []
        },
        dataType: undefined,
        aggregated: undefined
      })
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
      // update task id
      for (let i = 0; i < this.tasks.length; i++) {
        // update the task ids after the one that has been removed
        if (i >= index) this.tasks[i].id = this.tasks[i].id - 1
      }
    },
    addFormT () {
      this.tasks.push({
        id: this.tasks.length + 1,
        type: 'form',
        scheduling: {
          startEvent: 'consent',
          startDelaySecs: undefined,
          untilSecs: undefined,
          occurrences: undefined,
          intervalType: 'd',
          interval: 1,
          months: [],
          monthDays: [],
          weekDays: []
        },
        formKey: undefined,
        // this is mainly used for the consent tab, so it can be discarded when the object is sent to the server
        formName: undefined
      })
    },
    changeFormName (task, formKey) {
      let option = this.selectOptionsFormsList.find((opt) => {
        return opt.value === formKey
      })
      task.formName = option.label
    },
    createForm () {
      this.newForm = {
        name: undefined,
        description: undefined,
        questions: [{
          id: 'Q1',
          text: undefined,
          helper: undefined,
          type: 'freetext',
          nextDefaultId: undefined,
          answerChoices: [{
            id: 'Q1A1',
            text: undefined,
            nextQuestionId: undefined
          }]
        }]
      }
      this.$refs.formbuilder.show()
    },
    openFormBuilder () {
      this.$refs.formbuilder.show()
    },
    openFormSimulator () {
      this.$refs.formsimulator.show()
    }
  }
}
</script>
