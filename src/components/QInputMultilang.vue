<template>
  <div>
    <div v-for="lang in languages" :key="lang">
      <q-input :type="inputtype" :autogrow="inputtype == 'textarea'" :readonly="readonly"
      v-model="value[lang]" @blur="blur()" @input="update()"
      :hint="'Text in '+extendedLang(lang)"
      :rules="[val => (!required || !!val) || 'Field is required.']"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QInputMultilang',
  props: {
    value: Object,
    languages: Array,
    required: Boolean,
    readonly: Boolean,
    type: String
  },
  computed: {
    inputtype () {
      if (this.type) return this.type
      else return 'text'
    }
  },
  methods: {
    update () {
      this.$emit('input', this.value)
    },
    blur () {
      this.$emit('blur', this.value)
    },
    extendedLang (lang) {
      if (lang === 'en') return 'English'
      if (lang === 'sv') return 'Swedish'
      if (lang === 'it') return 'Italian'
      if (lang === 'es') return 'Spanish'
      return lang
    }
  }
}
</script>
