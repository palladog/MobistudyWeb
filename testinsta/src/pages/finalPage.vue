<template>
  <q-page padding>
     <div style="width:500px; max-widt:90vw;">
      <q-btn
      @click="gotopageFinalPage"
      color="green"
      label="Final Page"
      />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  methods: {
    gotopageFinalPage () {
      this.$router.push('/')
    }
  }
}
</script>
