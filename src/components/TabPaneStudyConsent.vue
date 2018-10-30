<template>
  <q-tab-pane name="tab-consent">
    <q-card class="form-card">
      <q-card-title>
        Consent
        <span slot="subtitle">Consent information viewed by participant</span>
      </q-card-title>
      <!-- Consent Tab: Invitation Message Card -->
      <q-card-main>
        <q-field label="Invitation Message" helper="The invitation message sent for the study.">
          <q-input v-model="consent.invitation" type="textarea" rows="7"/>
        </q-field>
      </q-card-main>
    </q-card>
    <!-- Consent Tab: Privacy Policy Card -->
    <q-card class="form-card">
      <q-card-title>
        Privacy Policy
        <span slot="subtitle">Privacy information viewed by participant.</span>
      </q-card-title>
      <q-card-main>
        <q-field label="Privacy Message" helper="This the privacy policy for the study.">
          <q-input v-model="consent.privacyPolicy" readonly type="textarea" rows="7"/>
        </q-field>
      </q-card-main>
    </q-card>

    <!-- Consent Tab: Items -->
    <q-card class="form-card">
      <q-card-title>
        Consent items
        <span slot="subtitle">Items that the participant has to consent to.</span>
      </q-card-title>
      <q-card-main>
        <q-list>
        <q-list-header>Automatically generated items from tasks. You can rephrase them, but they will be overwritten each time you change the tasks.</q-list-header>
          <q-item v-for="(tt, tindex) in consent.taskItems" :key="tindex">
            <q-item-side>Task {{ (tindex + 1) }}</q-item-side>
            <q-item-main>
              <div class="row items-center">
                <div class="col-10"><q-input v-model="tt.description" type="text"/></div>
                <div class="col-1">Optional:</div>
                <div class="col-1"><q-checkbox v-model="alwaysTrue" readonly disabled/></div>
              </div>
            </q-item-main>
          </q-item>
        </q-list>
        <q-list class="q-mt-md">
        <q-list-header>Extra items. Use them if you have other items in addition to the tasks.</q-list-header>
          <q-item v-for="(et, eindex) in consent.extraItems" :key="eindex">
            <q-item-side>Item {{ (eindex + 1) }}</q-item-side>
            <q-item-main>
              <div class="row items-center">
                <div class="col-9"><q-input v-model="et.description" type="text"/></div>
                <div class="col-1">Optional:</div>
                <div class="col-1"><q-checkbox v-model="et.optional" /></div>
                <div class="col-1"><q-btn round icon="remove" size="sm" color="negative" @click="removeExtraItem(eindex)"></q-btn></div>
              </div>
            </q-item-main>
          </q-item>
        </q-list>
        <q-btn icon="add" @click="addExtraItem()">Add an item</q-btn>
      </q-card-main>
    </q-card>
  </q-tab-pane>
</template>

<script>
import { schedulingToString } from '../data/Scheduling.js'
import QueryDataTypeEnum from '../data/QueryDataTypeEnum.js'

export default {
  name: 'TabPaneStudyConsent',
  props: ['consent', 'tasks'],
  data () {
    return {
      alwaysTrue: true
    }
  },
  watch: {
    // whenever tasks change, this function will run
    tasks: {
      handler: function (newTasks, oldTasks) {
        this.consent.taskItems = []
        for (let i = 0; i < newTasks.length; i++) {
          let task = newTasks[i]
          let newTaskItem = {
            description: undefined,
            taskId: task.id
          }
          if (task.type === 'dataQuery') {
            newTaskItem.description = 'You agree to send your data about ' +
            QueryDataTypeEnum.valueToString(task.dataType) + '. ' + schedulingToString(task.scheduling)
          } else if (task.type === 'form') {
            // TODO: retrieve the form name from the formKey
            newTaskItem.description = 'You agree to answer the TODO form. ' +
            schedulingToString(task.scheduling)
          }
          this.consent.taskItems.push(newTaskItem)
        }
        console.log('updating taskItems', this.consent.taskItems)
      },
      deep: true
    }
  },
  methods: {
    addExtraItem () {
      this.consent.extraItems.push({
        description: undefined,
        optional: true
      })
    },
    removeExtraItem (index) {
      this.consent.extraItems.splice(index, 1)
    }
  }
}
</script>
