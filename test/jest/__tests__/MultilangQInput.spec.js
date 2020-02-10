import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import MULTILANGQINPUT from '../../../src/components/QInputMultilang.vue'
import * as All from 'quasar'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('QInput Multilanguage', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const multilang = mount(MULTILANGQINPUT, {
    localVue,
    propsData: {
      value: {
        en: 'test text',
        it: 'testo test'
      },
      languages: ['en', 'it'],
      required: false,
      readonly: false
    }
  })

  it('passes the sanity check and creates a wrapper', () => {
    expect(multilang.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof multilang.vm.update).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(multilang.props('value').en).toBe('test text')
    expect(multilang.props('value').it).toBe('testo test')
    let qinputs = multilang.findAll(components.QInput)
    expect(qinputs.length).toBe(2)
    expect(qinputs.at(0).isVisible()).toBe(true)
    expect(qinputs.at(1).isVisible()).toBe(true)
    expect(qinputs.at(0).vm.value).toBe('test text')
    expect(qinputs.at(1).vm.value).toBe('testo test')
  })

  it('sets the translated texts', async () => {
    const inputs = multilang.findAll('input')
    expect(inputs.length).toBe(2)
    inputs.at(0).setValue('test 1')
    inputs.at(1).setValue('test 2')

    expect(multilang.vm.value.en).toBe('test 1')
    expect(multilang.vm.value.it).toBe('test 2')
  })

})
