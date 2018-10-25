<template>
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
      </q-card-main>
    </q-card>
    <!-- Data Queries -->
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
          <q-select color="secondary" v-model="task.formKey" :options="selectOptionsFormsList"/>
        </q-field>
        <q-field class="q-mt-lg" label="Scheduling:" helper="Use the triangle to show or hide the information.">
          <q-collapsible icon="calendar_today" :label="schedulingToString(task.scheduling)" opened>
            <scheduler v-model="task.scheduling"></scheduler>
          </q-collapsible>
        </q-field>
        <q-btn label="Remove this task" color="negative" icon="remove" @click="removeTask(index)"/>

        <q-card-separator v-if="index !== tasks.length-1"/>
      </q-card-main>
    </q-card>

    <formbuilder ref="formbuilder" v-model="newForm" @formview="viewForm()"></formbuilder>
    <formviewer ref="formviewer" form="newForm" @closed="openFormBuilder()"></formviewer>
  </q-tab-pane>
</template>

<script>
import Scheduler from 'components/SchedulerCard.vue'
import { schedulingToString } from '../data/Scheduling.js'
import API from '../data/API.js'
import FormBuilder from 'components/FormBuilderModal.vue'
import FormViewer from 'components/FormViewerModal.vue'

export default {
  components: {
    'scheduler': Scheduler,
    'formbuilder': FormBuilder,
    'formviewer': FormViewer
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
          type: 'singleChoice',
          nextDefaultId: undefined,
          answerChoices: [{
            id: 'Q1A1',
            text: undefined,
            nextQuestionId: undefined
          }]
        }]
      },
      selectOptionsDataTypeForQuery: [
        { label: 'Steps', value: 'valSteps', color: 'black' },
        { label: 'Weight', value: 'valWeight', color: 'secondary' }
      ]
    }
  },
  async created () {
    this.getForms()
  },
  methods: {
    async getForms () {
      let forms = await API.getFormsList()
      this.selectOptionsFormsList = forms.map((f) => {
        return {
          label: f.name,
          value: f._key
        }
      })
    },
    schedulingToString (sc) {
      return schedulingToString(sc)
    },
    addDT () {
      this.tasks.push({
        id: this.tasks.length,
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
    },
    addFormT () {
      this.tasks.push({
        id: this.tasks.length,
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
        formKey: undefined
      })
    },
    createForm () {
      // TODO: reset the current form
      this.$refs.formbuilder.show()
    },
    openFormBuilder () {
      this.$refs.formbuilder.show()
    },
    viewForm () {
      this.$refs.formviewer.show()
    }
  }
}
</script>
