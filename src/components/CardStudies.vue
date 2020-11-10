<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">Studies</div>
      </q-card-section>
    <q-card-section>
      <div v-for="(study, index) in studies" :key="index">
        <div class="row">
          <div class="col-7"></div>
          <div class="col-5">
            <q-btn class="float-right" label="Delete" color="negative" icon="remove" @click="deleteStudy(index)"/>
          </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold">Study Key: </div>
          <div class="col"> {{study._key}} </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold">Title: </div>
          <div class="col"> {{study.generalities.title}} </div>
        </div>
        <div class="row q-ma-sm">
          <div class="col-2 text-bold">TeamKey: </div>
          <div class="col"> {{study.teamKey}} </div>
        </div>
        <q-separator v-if="index != studies.length-1" class="q-mt-sm q-mb-sm"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import API from '../modules/API'

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
      this.$q.dialog({
        title: 'Deleting Study',
        color: 'warning',
        message: 'You are deleting the study ' + study.generalities.title + ' from the DB. This will affect participants of that study ' +
        ' and they will no longer be associated to that study. This cannot be undone. Would you like to continue?',
        ok: 'Yes, delete Study',
        cancel: 'Cancel'
      }).onOk(async () => {
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
      })
    }
  }
}
</script>
