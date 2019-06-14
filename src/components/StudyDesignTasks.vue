<template>
  <div>
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Tasks </div>
      </q-card-section>
      <q-card-section>
        <q-btn-dropdown split label="Add task">
          <!-- dropdown content -->
          <q-list link>
            <q-item clickable v-close-popup @click.native="addDT()">
              <q-item-section>
                <q-item-label>Data query Task</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click.native="addFormT()">
              <q-item-section>
                <q-item-label>Form</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-section>
    </q-card>
    <!-- Tasks -->
    <q-card  v-for="(task, index) in value" :key="index" class="form-card">
      <q-card-section>
        <div class="text-h6" v-if="task.type === 'dataQuery'"> Data Query Task </div>
        <div class="text-h6" v-if="task.type === 'form'"> Form Task </div>
      </q-card-section>
      <q-card-section>
        <div v-if="task.type === 'dataQuery'" class="row q-ma-sm">
          <div class="col-2 text-bold"> Data type: </div>
          <div class="col">
            <q-select v-model="task.dataType" emit-value map-options :options="selectOptionsDataTypeForQuery" hint="Data type to be collected." @input="update()"/>
          </div>
        </div>
        <div v-if="task.type === 'dataQuery' && allowAggregated(task.dataType)" class="row q-ma-sm">
          <div class="col-2 text-bold"> Aggregated: </div>
          <div class="col">
            <q-field hint="If aggregated, the data will be summed.">
              <q-checkbox v-model="task.aggregated" @input="update()"/>
            </q-field>
          </div>
        </div>
        <div v-if="task.type === 'dataQuery' && allowAggregated(task.dataType)" class="row q-ma-sm">
          <div class="col-2 text-bold"> Bucket: </div>
          <div class="col">
            <q-select v-model="task.bucket" emit-value map-options :options="selectOptionsBucketForQuery" :readonly="!task.aggregated" :disable="!task.aggregated" hint="You can sum the data into buckets of given length." @input="update()"/>
          </div>
        </div>

        <q-btn v-if="task.type === 'form'" label="Create new Form" @click="createForm()"/>

        <div v-if="task.type === 'form'" class="row q-ma-sm">
          <div class="col-2 text-bold"> Form: </div>
          <div class="col">
            <q-select v-model="task.formKey" emit-value map-options :options="selectOptionsFormsList" @input="changeFormName(task, $event)" hint="Select the form from the list."/>
          </div>
        </div>

        <div class="row q-ma-sm">
          <div class="col-2 text-bold"> Scheduling: </div>
          <div class="col">
            <q-field hint="Scheduling of the task. Click the down-arrow to expand.">
              <q-expansion-item expand-separator  :label="schedulingToString(task.scheduling)">
                <scheduler v-model="task.scheduling"></scheduler>
              </q-expansion-item>
            </q-field>
          </div>
        </div>

        <q-btn label="Remove this task" color="negative" icon="remove" @click="removeTask(index)"/>
      </q-card-section>
    </q-card>

    <formbuilder ref="formbuilder" v-model="newForm" @simulateForm="openFormSimulator()"></formbuilder>
    <formsimulator ref="formsimulator" :form='newForm' @closed="openFormBuilder()"></formsimulator>
  </div>
</template>

<script>
import Scheduler from 'components/CardScheduler.vue'
import { schedulingToString } from '../modules/Scheduling.js'
import API from '../modules/API.js'
import FormBuilder from 'components/ModalFormBuilder.vue'
import FormSimulator from 'components/ModalFormSimulator.vue'
import QueryDataTypeEnum from '../modules/QueryDataTypeEnum.js'

export default {
  components: {
    'scheduler': Scheduler,
    'formbuilder': FormBuilder,
    'formsimulator': FormSimulator
  },
  name: 'StudyDesignTasks',
  props: [ 'value' ],
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
      }),
      selectOptionsBucketForQuery: [{
        value: 'none',
        label: 'None'
      },
      {
        value: 'hour',
        label: 'Hour'
      },
      {
        value: 'day',
        label: 'Day'
      },
      {
        value: 'week',
        label: 'Week'
      },
      {
        value: 'month',
        label: 'Month'
      },
      {
        value: 'year',
        label: 'Year'
      }]
    }
  },
  async created () {
    this.getForms()
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    },
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
    allowAggregated (v) {
      let state = QueryDataTypeEnum.allowsAggregated(v)
      return state
    },
    addDT () {
      this.value.push({
        id: this.value.length + 1,
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
        aggregated: false,
        bucket: 'none'
      })
    },
    removeTask (index) {
      this.value.splice(index, 1)
      // update task id
      for (let i = 0; i < this.value.length; i++) {
        // update the task ids after the one that has been removed
        if (i >= index) this.value[i].id = this.value[i].id - 1
      }
    },
    addFormT () {
      this.value.push({
        id: this.value.length + 1,
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
