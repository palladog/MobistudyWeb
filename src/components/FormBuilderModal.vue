<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg">
      <h4>Basic Modal</h4>
      <q-input v-model="value.name" type="text"></q-input>
      <q-btn color="secondary" @click="viewForm()" label="View" />
      <q-btn color="primary" @click="opened = false" label="Close" />
    </div>
  </q-modal>
</template>

<script>
export default {
  name: 'FormBuilder',
  props: ['value'],
  data () {
    return {
      opened: false
    }
  },
  methods: {
    show () {
      console.log('props', this.value)
      this.opened = true
    },
    viewForm () {
      this.opened = false
      this.$emit('formview', this.value)
    },
    update () {
      console.log(this.value)
      this.$emit('input', this.value)
    }
  }
}
</script>
