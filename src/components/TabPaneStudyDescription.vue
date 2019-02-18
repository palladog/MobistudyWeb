<template>
  <q-tab-pane v-if="studyDesign._key != -1" name="tab-study-description">
    <q-card class="form-card">
      <q-card-title> {{ studyDesign.generalities.title }} </q-card-title>
        <q-card-main>
            <q-field label="Description:"> {{ studyDesign.generalities.longDescription }} </q-field>
            <q-field label="Start Date of Study:"> {{ niceDate(studyDesign.generalities.startDate) }} </q-field>
            <q-field label="End Date of Study:"> {{ niceDate(studyDesign.generalities.endDate) }} </q-field>
            <q-card-separator/>
            <q-field label="Created on:"> {{ niceDate(studyDesign.createdTS) }} </q-field>
            <q-field label="Published on:"> {{ niceDate(studyDesign.publishedTS) }} </q-field>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Principal Investigators: </q-card-title>
        <q-card-main>
            <div v-for="(pi, pIndex) in studyDesign.generalities.principalInvestigators" :key="pIndex">
                <q-field label="P.I. Name &amp; Title:">
                    <!-- <q-input v-model="pi.name" type="text" readonly/> -->
                    {{ pi.name }}
                </q-field>
                <q-field label="Contact Details:">
                    <!-- <q-input v-model="pi.contact" type="textarea" readonly/> -->
                    {{ pi.contact }}
                </q-field>
                <q-field label="Institution:">
                    <!-- <q-input v-model="pi.institution" type="text" readonly/> -->
                    {{ pi.institution }}
                </q-field>
                <q-card-separator v-show="pIndex != studyDesign.generalities.principalInvestigators.length-1"/>
            </div>
         </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Institutions: </q-card-title>
        <q-card-main>
            <div v-for="(inst, inIndex) in studyDesign.generalities.institutions" :key="inIndex">
                <q-field label="Name of Institution:">
                    {{ inst.name }}
                </q-field>
                <q-field label="Contact Details:">
                    {{ inst.contact }}
                </q-field>
                <q-field class="q-mt-md" label="Data Access:">
                    {{ inst.dataAccess}}
                </q-field>
                <q-field label="Reason for Data Access:">
                    {{ inst.reasonForDataAccess }}
                </q-field>
                <q-card-separator v-show="inIndex != studyDesign.generalities.institutions.length-1"/>
            </div>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Inclusion Criteria: </q-card-title>
        <q-card-main>
            <q-field label="Age range:"> From {{ studyDesign.inclusionCriteria.minAge }} to {{ studyDesign.inclusionCriteria.maxAge }} </q-field>
            <q-field label="Gender:">
              <div v-for="(ge, gIndex) in studyDesign.inclusionCriteria.gender" :key="gIndex"> {{ ge }} </div>
            </q-field>
            <q-field label="Number Of Participants:" > {{ studyDesign.inclusionCriteria.numberOfParticipants }} </q-field>
            <q-field label="Diseases:">
              <div v-for="(dis, diIndex) in studyDesign.inclusionCriteria.diseases" :key="diIndex"> {{ dis.name }} </div>
            </q-field>
            <q-field label="Medications:">
              <div v-for="(med, meIndex) in studyDesign.inclusionCriteria.medications" :key="meIndex"> {{ med.name }} </div>
            </q-field>
            <q-field label="Lifestyle:">
              <div v-for="(lif, lifIndex) in studyDesign.inclusionCriteria.lifestyle" :key="lifIndex"> {{ lif }} </div>
            </q-field>
            <div class="q-pa-lg q-mt-sm shadow-1 bg-green-1"> Criteria Questions:
                <div v-for="(qu, qIndex) in studyDesign.inclusionCriteria.criteriaQuestions" :key="qIndex">
                    <q-field label="Question:"> {{ qu.title }} </q-field>
                    <q-field label="Answer:"> {{ qu.answer }} </q-field>
                   <q-card-separator v-show="qIndex != studyDesign.inclusionCriteria.criteriaQuestions.length-1"/>
                </div>
            </div>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Tasks: </q-card-title>
        <q-card-main>
          <div class="q-pa-lg q-mt-sm shadow-1 bg-green-1">
            <div v-for="(task, taIndex) in studyDesign.tasks" :key="taIndex">
              <q-field label="Task ID:"> {{ task.id }}</q-field>
              <q-field label="Type:"> {{ task.type }} </q-field>
              <div v-if="task.type == 'dataQuery'">
                <q-field label="Data Type:"> {{ task.dataType }} </q-field>
                <q-field label="Aggregated:"> {{ task.aggregated }} </q-field>
                <q-field label="Bucket:"> {{ task.bucket }} </q-field>
              </div>
              <div v-if="task.type == 'form'">
                <q-field label="Key:"> {{ task.formKey }} </q-field>
                <q-field label="Name:"> {{ task.formName }} </q-field>
              </div>
              <q-field label="Scheduling: "> {{ schedulingToString(task.scheduling) }} </q-field>
              <q-card-separator v-show="taIndex != studyDesign.tasks.length-1"/>
            </div>
          </div>
        </q-card-main>
    </q-card>
    <q-card class="form-card">
        <q-card-title> Consent: </q-card-title>
        <q-card-main>
            <q-field label="Invitation:"> {{ studyDesign.consent.invitation }} </q-field>
            <q-field label="Privacy Policy:">
              <div v-html="studyDesign.consent.privacyPolicy.replace(new RegExp('\n', 'g'), '<br>')"/>
            </q-field>
            <div class="q-pa-lg q-mt-sm shadow-1 bg-green-1"> Tasks Items:
              <div v-for="(tkItem, tsIndex) in studyDesign.consent.taskItems" :key="tsIndex">
                <q-field label="Task ID:"> {{ tkItem.taskId }}</q-field>
                <q-field label="Description:"> {{ tkItem.description }}</q-field>
                <q-card-separator v-show="tsIndex != studyDesign.consent.taskItems.length-1"/>
              </div>
              <div v-for="(extItem, exIndex) in studyDesign.consent.extraItems" :key="exIndex">
                <q-field label="Description:"> {{ extItem.description }}</q-field>
                <q-field label="Optional:"> {{ extItem.optional }}</q-field>
                <q-card-separator v-show="exIndex != studyDesign.consent.taskItems.length-1"/>
              </div>
          </div>
        </q-card-main>
    </q-card>

  </q-tab-pane>
</template>

<script>
import { date } from 'quasar'
import { schedulingToString } from '../data/Scheduling.js'

export default {
  name: 'TabPaneStudyDescription',
  props: ['studyDesign'],
  methods: {
    niceDate (timeStamp) {
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
    },
    schedulingToString (sc) {
      return schedulingToString(sc)
    }
  }
}
</script>
