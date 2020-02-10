<template>
<div>
  <q-input id="input" v-model="value" @input="update()"></q-input>
</div>
</template>

<script>
export default {
  name: 'QINPUT',
  props: [ 'value' ],
  data () {
    return {
      text: this.value
    }
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    }
  }
}
</script>
