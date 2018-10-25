<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg">
      <h4>Viewer</h4>
      <q-btn color="primary" @click="close()" label="Close" />
    </div>
  </q-modal>
</template>

<script>
export default {
  name: 'FormViewer',
  props: ['form'],
  data () {
    return {
      opened: false
    }
  },
  methods: {
    show () {
      this.opened = true
    },
    close () {
      this.opened = false
      this.$emit('closed')
    }
  }
}
</script>
