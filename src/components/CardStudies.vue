<template>
  <q-card>
    <q-card-title>
      Studies
    </q-card-title>
    <q-card-main>
      <div v-for="(study, index) in studies" :key="index">
        <div class="row">
          <div class="col-7"></div>
          <div class="col-5">
            <q-btn class="float-right" label="Delete Study from Db" color="negative" icon="remove" @click="deleteStudy(index)"/>
          </div>
        </div>
        <q-field class="text-weight-bolder" label="Study Key: ">
          {{study._key}}
        </q-field>
        <q-field class="text-weight-bolder" label="Title: ">
          {{study.generalities.title}}
        </q-field>
        <q-field class="text-weight-bolder" label="TeamKey: ">
          {{study.teamKey}}
        </q-field>
        <q-card-separator v-if="index != studies.length-1" class="q-mt-sm q-mb-sm"/>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import API from '../data/API'

export default {
  name: 'CardStudies',
  data () {
    return {
      studies: []
    }
  },
  created () {
    this.geStudies()
  },
  methods: {
    async geStudies () {
      try {
        this.studies = await API.getStudies()
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          message: 'Cannot retrieve studies list',
          icon: 'report_problem'
        })
      }
    },
    // Delete STUDY from Db
    async deleteStudy (index) {
      let study = this.studies[index]
      try {
        await this.$q.dialog({
          title: 'Deleting Study',
          color: 'warning',
          message: 'You are deleting the study ' + study.generalities.title + ' from the DB. This will affect participants of that study ' +
          ' and they will no longer be associated to that study.This cannot be undone. Would you like to continue?',
          ok: 'Yes, delete Study',
          cancel: 'Cancel'
        })
        try {
          await API.deleteStudy(study._key)
          this.allUsers.splice(index, 1)
          this.$q.notify('Study ' + study.generalities.title + ' Deleted')
          this.getStudies()
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete study ' + study.generalities.title,
            icon: 'report_problem'
          })
        }
      } catch (n) {
        // nothing to do here
      }
    }
  }
}
</script>
