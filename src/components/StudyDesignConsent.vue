<template>
  <div>
    <q-card class="form-card">
      <q-card-section>
        <div class="text-h6"> Consent </div>
        <div class="text-subtitle1"> Consent information reviewed by participant </div>
      </q-card-section>
      <!-- Consent Tab: Invitation Message Card -->
      <q-card-section>
        <div class="row">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Invitation Message:
            </div>
            <div class="text-caption">
              An invitation message recevied by the participant.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input-multilang type="textarea" v-model.trim="value.consent.invitation" @blur="v.consent.invitation.$touch" @input="update()" :languages="value.generalities.languages" required/>
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-4 q-pt-lg">
            <div class="text-bold">
              Privacy Policy:
            </div>
            <div class="text-caption">
              Edit the policy according to the study's characteristics. You can use the automatic example as a baseline.
            </div>
          </div>
          <div class="col q-pl-sm">
            <q-input-multilang type="textarea" v-model.trim="value.consent.privacyPolicy" @blur="v.consent.privacyPolicy.$touch" @input="update()" :languages="value.generalities.languages" required/>
            <q-btn label="Generate example policy" color="primary" @click="generatePrivacy()"/>
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-2 text-bold q-pt-md"> Consent items: </div>
          <div class="col">
            <q-list>
              <q-item-label header>These are automatically generated items from tasks. You can rephrase them, but they will be overwritten each time you change the tasks. These consent items are always optional.</q-item-label>
              <q-item v-for="(tt, tindex) in value.consent.taskItems" :key="tindex">
                <q-item-section avatar>Task {{ (tindex + 1) }}</q-item-section>
                <q-item-section>
                  <div class="row items-center">
                    <div class="col-9"><q-input v-model="tt.description" type="textarea" rows="3" @input="update()"/></div>
                    <div class="col-2"><q-checkbox label="Optional" v-model="alwaysTrue"  disable/></div>
                    <div class="col-1"></div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="q-mt-md">
              <q-item-label header>
                Extra items. Use them if you have other items in addition to the ones listed above.
                For example if you have items that are not related to the mobile phone data collection, like visits or analysis.
                If an item is not set to "optional", participants cannot join the study if they do not consent to it.
              </q-item-label>
              <q-item v-for="(et, eindex) in value.consent.extraItems" :key="eindex">
                <q-item-section avatar>Item {{ (eindex + 1) }}</q-item-section>
                <q-item-section>
                  <div class="row items-center">
                    <div class="col-9">
                      <q-input v-model="et.description" type="textarea" rows="3" hint="Description of the consent item." @input="update()"/>
                    </div>
                    <div class="col-2"><q-checkbox label="Optional" v-model="et.optional"  @input="update()"/></div>
                    <div class="col-1">
                      <q-btn round icon="remove" size="xs" color="negative" @click="removeExtraItem(eindex)"></q-btn>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <q-btn icon="add" @click="addExtraItem()">Add an item</q-btn>
          </div>
        </div>
    </q-card-section>
  </q-card>
  </div>
</template>

<script>
import QInputMultilang from './QInputMultilang'
import { schedulingToString } from '../modules/Scheduling.js'

let healthDataTypesEnum2String = function (type) {
  if (type === 'steps') return 'Steps'
  if (type === 'weight') return 'Weight'
  if (type === 'height') return 'Height'
  if (type === 'activity') return 'Activity'
  if (type === 'heart_rate') return 'Heart rate'
  if (type === 'heart_rate_variability') return 'Heart rate variability'
  if (type === 'calories') return 'Calories'
  if (type === 'distance') return 'Distance walked or run'
  return '???'
}

export default {
  name: 'StudyDesignConsent',
  // value is the whole study design
  props: ['value', 'v'],
  components: {
    QInputMultilang
  },
  data () {
    return {
      alwaysTrue: true
    }
  },
  created () {
    this.value.consent.taskItems = []
    for (let i = 0; i < this.value.tasks.length; i++) {
      let task = this.value.tasks[i]
      let newTaskItem = {
        description: undefined,
        taskId: task.id
      }
      if (task.type === 'dataQuery') {
        newTaskItem.description = 'You agree to send your data about ' +
        healthDataTypesEnum2String(task.dataType) + '. ' + schedulingToString(task.scheduling)
      } else if (task.type === 'form') {
        newTaskItem.description = `You agree to answer the "${task.formName}" form. ` +
        schedulingToString(task.scheduling)
      }
      this.value.consent.taskItems.push(newTaskItem)
    }
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    },
    addExtraItem () {
      this.value.consent.extraItems.push({
        description: undefined,
        optional: true
      })
    },
    removeExtraItem (index) {
      this.value.consent.extraItems.splice(index, 1)
    },
    generatePrivacy () {
      for (let lang of this.value.generalities.languages) {
        let string = this.$i18n.t('privacyPolicy.collectedData', lang)
        for (let task of this.value.tasks) {
          if (task.type === 'form') string += '\n' + this.$i18n.t('privacyPolicy.collectedDataForm', lang, { formName: task.formName })
          else if (task.type === 'dataQuery') string += '\n' + this.$i18n.t('privacyPolicy.collectedDataQuery', lang, { dataType: healthDataTypesEnum2String(task.dataType) })
        }
        string += '\n\n' + this.$i18n.t('privacyPolicy.storage', lang)
        string += '\n\n' + this.$i18n.t('privacyPolicy.access', lang)
        for (let institution of this.value.generalities.institutions) {
          string += '\n' + this.$i18n.t('privacyPolicy.accessInstitution', lang, { institution: institution.name })
          if (institution.dataAccess !== 'no') {
            string += ', ' + this.$i18n.t('privacyPolicy.accessReason', lang, { reason: institution.reasonForDataAccess[lang] })
          }
        }
        string += '\n\n' + this.$i18n.t('privacyPolicy.rights', lang)
        string += '\n\n' + this.$i18n.t('privacyPolicy.contacts', lang)
        for (let pi of this.value.generalities.principalInvestigators) {
          string += '\n' + this.$i18n.t('privacyPolicy.piContact', lang, { name: pi.name, contact: pi.contact })
        }
        this.value.consent.privacyPolicy[lang] = string
      }
    }
  }
}
</script>
