<template>
  <q-page padding>
     <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="$q.notify('Submission Preview')"
      color="purple"
      label="Submission Preview"
      />
    </div>
    <div class="next-container">
      <q-btn class="nextbutton"
      label="Submit Form"
      color="orange"
      @click="gotopageFinalPage"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<style>
/*Next button*/
.next-container{
  max-width: 750px;
  margin: 20px auto 0 auto;
  padding: 30px;
  background-color: rgba(60, 122, 141, 0.7);
}
</style>

<script>
export default {
  // name: 'PageName',
  methods: {
    gotopageFinalPage () {
      this.$router.push('finalPage')
    }
  }
}
</script>
