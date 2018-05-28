<template>
  <q-page>
    <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="$q.notify('Tasks')"
      color="green"
      label="Tasks"
      />
    </div>
    <div class="next-container">
      <q-btn class="nextbutton"
      label="Next Page"
      icon-right="arrow_forward"
      color="orange"
      @click="gotopagecriteria"
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
  background-color: rgb(60, 122, 141);
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    gotopagecriteria () {
      this.$router.push('pageconsent')
    }
  }
}
</script>
