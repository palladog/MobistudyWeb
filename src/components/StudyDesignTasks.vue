<template>
  <div>
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Tasks </div>
        <div class="text-subtitle1"> At least one task has to be specified. </div>
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
        <div v-if="task.type === 'dataQuery'" class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Data type:
            </div>
            <div class="text-caption">
              Data type to be collected.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-select v-model="task.dataType" emit-value map-options :options="selectOptionsDataTypeForQuery" hint="Data type to be collected." @input="update()"/>
          </div>
        </div>
        <div v-if="task.type === 'dataQuery' && allowAggregated(task.dataType)" class="row">
          <div class="col-4">
            <div class="text-bold">
              Aggregation:
            </div>
            <div class="text-caption">
              Optional. If aggregated, the data will be summed over the entire period or per bucket.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-checkbox v-model="task.aggregated" @input="update()"/>
          </div>
        </div>
        <div v-if="task.type === 'dataQuery' && allowAggregated(task.dataType)" class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Bucket:
            </div>
            <div class="text-caption">
              You can sum the data into buckets of given length.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-select v-model="task.bucket" emit-value map-options :options="selectOptionsBucketForQuery" :readonly="!task.aggregated" :disable="!task.aggregated" @input="update()"/>
          </div>
        </div>

        <q-btn v-if="task.type === 'form'" label="Create new Form" @click="createForm()"/>

        <div v-if="task.type === 'form'" class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Form:
            </div>
            <div class="text-caption">
              Select the form from the list or create a new one.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-select v-model="task.formKey" emit-value map-options :options="selectOptionsFormsList" @input="changeFormName(task, $event)"/>
          </div>
        </div>

        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Scheduling:
            </div>
            <div class="text-caption">
              Scheduling of the task. Click the down-arrow to expand.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-expansion-item expand-separator  :label="schedulingToString(task.scheduling)">
              <scheduler v-model="task.scheduling"></scheduler>
            </q-expansion-item>
          </div>
        </div>

        <q-btn label="Remove this task" color="negative" icon="remove" @click="removeTask(index)"/>
      </q-card-section>
    </q-card>

    <formbuilder ref="formbuilder" v-model="newForm" @simulateForm="openFormSimulator()" @saved="getForms()"></formbuilder>
    <formsimulator ref="formsimulator" :form='newForm' @closed="openFormBuilder()"></formsimulator>
  </div>
</template>

<script>
import Scheduler from 'components/CardScheduler.vue'
import { schedulingToString } from '../modules/Scheduling.js'
import API from '../modules/API.js'
import FormBuilder from 'components/DialogFormBuilder.vue'
import FormSimulator from 'components/DialogFormSimulator.vue'
import HealthDataTypesEnum from '../modules/healthDataTypesEnum.js'

let healthDataTypesEnum2String = function (type) {
  if (type === 'steps') return 'Steps'
  if (type === 'weight') return 'Weight'
  if (type === 'height') return 'Height'
  if (type === 'activity') return 'Activity (incl. walking, running, biking, sleeping, sport, ...)'
  if (type === 'heart_rate') return 'Heart rate (cannot aggregate)'
  if (type === 'heart_rate_variability') return 'Heart Rate Variability (iPhones only, cannot aggregate)'
  if (type === 'calories') return 'Calories'
  if (type === 'distance') return 'Distance'
  return '???'
}

export default {
  components: {
    'scheduler': Scheduler,
    'formbuilder': FormBuilder,
    'formsimulator': FormSimulator
  },
  name: 'StudyDesignTasks',
  props: [ 'value', 'teamKey' ],
  data () {
    return {
      selectOptionsFormsList: [],
      newForm: {
        teamKey: this.teamKey,
        name: undefined,
        description: undefined,
        references: undefined,
        public: false,
        copyright: undefined,
        questions: []
      },
      selectOptionsDataTypeForQuery: HealthDataTypesEnum.values.map((v) => {
        return {
          label: healthDataTypesEnum2String(v),
          value: v
        }
      }),
      selectOptionsBucketForQuery: [
        {
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
        }
      ]
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
      return schedulingToString(sc, 'en')
    },
    allowAggregated (v) {
      let state = HealthDataTypesEnum.allowsAggregated(v)
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
      this.update()
    },
    removeTask (index) {
      this.value.splice(index, 1)
      // update task id
      for (let i = 0; i < this.value.length; i++) {
        // update the task ids after the one that has been removed
        if (i >= index) this.value[i].id = this.value[i].id - 1
      }
      this.update()
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
      this.update()
    },
    changeFormName (task, formKey) {
      let option = this.selectOptionsFormsList.find((opt) => {
        return opt.value === formKey
      })
      task.formName = option.label
      this.update()
    },
    createForm () {
      this.newForm = {
        teamKey: this.teamKey,
        name: undefined,
        description: undefined,
        references: undefined,
        public: false,
        copyright: undefined,
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
