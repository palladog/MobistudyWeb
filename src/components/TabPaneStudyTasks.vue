<template>
    <q-tab-pane name="tab-tasks">
        <q-card class="bg-cyan-2 q-ma-xl">
            <q-card-title> Add a task </q-card-title>
            <q-card-main>
                <q-field class="q-mt-md q-mb-lg" label="Please click on data type or form:">
                <q-btn class="q-mr-lg" color="white" text-color="black" icon-right="add" label="Add a data type" @click="addDataQuery" />
                <!-- <q-btn color="white" text-color="black" icon-right="add" label="Add a form" @click="addFormTapped" /> -->
                </q-field>
            </q-card-main>
        </q-card>
    <!-- Data Queries -->
      <div v-for="(dataQuery, index) in tsk.dataQueries" :key=dataQuery.id>
        <q-card class="bg-cyan-2 q-ma-xl" v-show="showDataQuery">
          <q-card-title style="width: 300px; max-width: 90vw;">
            Data Type
          </q-card-title>
          <q-card-main>
              <q-btn class="q-mb-md q-mr-md float-right" v-show="index !==0" round size="sm" color="red" icon="remove" @click="removeDT(index)" />
            <q-select
                style="width: 300px; max-width: 90vw;"
                color="secondary"
                v-model="dataQuery.selectDataTypeForQuery"
                :options="dataQuery.selectOptionsDataTypeForQuery"
                placeholder="Please select a data type"
            />
            <q-field class="q-mt-lg" label="Please schedule the events." />
              <q-btn class="q-mb-sm" style="background: white" icon="schedule" size="small" @click="displaySchdDT(index)"/>
                <div v-show="dataQuery.showSchdDT">
                  <scheduler @schedChild="dataQuery.schedulerData = $event" class="bg-white"></scheduler>
                </div>
            <q-card-separator class="q-mb-md q-mt-md"/>
          </q-card-main>
        </q-card>
      </div>
    </q-tab-pane>
</template>

<script>
import Scheduler from 'components/Scheduler.vue'
export default {
  components: {
    'scheduler': Scheduler
  },
  name: 'TabPaneStudyTasks',
  props: ['tasks'],
  computed: {
    tsk: {
      get () { return this.tasks.tasks },
      set (value) { this.$emit('updateTasks', value) }
    }
  },
  methods: {
    addDT (index) {
      this.dataQueries.push({
        schedulerData: '',
        showSchdDT: false,
        selectDataTypeForQuery: {},
        selectOptionsDataTypeForQuery: [
          { label: 'Steps', value: 'valSteps', color: 'black' },
          { label: 'Weight', value: 'valWeight', color: 'secondary' }
        ]
      })
    },
    removeDT (index) {
      this.dataQueries.splice(index, 1)
    },
    addDataQuery () {
      this.counterSchDt++
      this.showDataQuery = true
      if (this.counterSchDt > 1) {
        this.addDT()
      }
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
