import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import QINPUT from './demo/QInput-demo.vue'
import * as All from 'quasar'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('QInput demo', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components })

  const wrapper = mount(QINPUT, {
    localVue,
    propsData: {
      value: 'test'
    }
  })

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('sets a value correctly', async () => {
    const input = wrapper.find('input[type=text]')
    input.setValue('test 1')
    expect(wrapper.vm.value).toBe('test 1')
  })
})
