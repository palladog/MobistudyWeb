<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input v-model="date" mask="date" :label="label" :clearable="clearable" :outlined="outlined">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="date" @input="update()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'QDateInput',
  props: [ 'value', 'label', 'clearable', 'outlined' ],
  data () {
    return {
      date: this.value
    }
  },
  methods: {
    update () {
      this.$refs.qDateProxy.hide()
      this.$emit('input', this.value)
    }
  }
}
</script>
