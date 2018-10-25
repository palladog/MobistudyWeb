<template>
  <q-tab-pane name="tab-tasks">
    <q-card class="form-card">
      <q-card-title> Add a task </q-card-title>
      <q-card-main>
        <q-field class="q-mt-md q-mb-lg" label="Please click on data type or form:">
          <q-btn class="q-mr-lg" color="white" text-color="black" icon-right="add" label="Add a Data Query" @click="addDT()" />
          <!-- <q-btn color="white" text-color="black" icon-right="add" label="Add a form" @click="addFormTapped" /> -->
        </q-field>
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
        <q-field class="q-mt-lg" label="Scheduling:">
          <q-collapsible icon="calendar_today" :label="schedulingToString(task.scheduling)" opened>
            <scheduler v-model="task.scheduling"></scheduler>
          </q-collapsible>
        </q-field>
        <q-btn label="Remove this task" color="negative" icon="remove" @click="removeTask(index)"/>

        <q-card-separator v-if="index !== tasks.length-1"/>
      </q-card-main>
    </q-card>
  </q-tab-pane>
</template>

<script>
import Scheduler from 'components/SchedulerCard.vue'
import { schedulingToString } from '../data/Scheduling.js'

export default {
  components: {
    'scheduler': Scheduler
  },
  name: 'TabPaneStudyTasks',
  props: [ 'tasks' ],
  data () {
    return {
      selectOptionsDataTypeForQuery: [
        { label: 'Steps', value: 'valSteps', color: 'black' },
        { label: 'Weight', value: 'valWeight', color: 'secondary' }
      ]
    }
  },
  methods: {
    schedulingToString (sc) {
      return schedulingToString(sc)
    },
    addDT () {
      this.tasks.push({
        type: 'dataQuery',
        scheduling: {
          recurring: undefined
        },
        dataType: undefined,
        aggregated: undefined
      })
      console.log(this.tasks)
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
      console.log(this.tasks)
    },
    displaySchdDT (index) {
      this.dataQueries[index].showSchdDT = !this.dataQueries[index].showSchdDT
    },
    displaySchdForm () {
      if (this.showSchdForm === false) {
        this.showSchdForm = true
      } else {
        this.showSchdForm = false
      }
    }
  }
}
</script>
