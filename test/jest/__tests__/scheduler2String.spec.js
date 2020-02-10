import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
import { schedulingToString } from '../../../src/modules/Scheduling.js'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Scheduler to String', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components })

  it('until 5 days after consent', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 0,
      untilSecs:5 * 24 * 60 * 60,
      intervalType:"d",
      months:[],
      monthDays:[],
      weekDays:[],
      interval:0
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('Until 5 days after you have consented. ')
  })

  it('from 5 days after consent', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 5 * 24 * 60 * 60,
      untilSecs:0,
      intervalType:"d",
      months:[],
      monthDays:[],
      weekDays:[],
      interval:0
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('5 days after you have consented. ')
  })

  it('Daily', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 0,
      untilSecs:0,
      intervalType:"d",
      months:[],
      monthDays:[],
      weekDays:[],
      interval:1
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('Repeated daily. ')
  })

  it('every 3 days', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 0,
      untilSecs:0,
      intervalType:"d",
      months:[],
      monthDays:[],
      weekDays:[],
      interval:3
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('Repeated every 3 days. ')
  })

  it('every 3 weeks', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 0,
      untilSecs:0,
      intervalType:"w",
      months:[],
      monthDays:[],
      weekDays:[],
      interval:3
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('Repeated every 3 weeks. ')
  })

  it('daily, on mondays', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 0,
      untilSecs:0,
      intervalType:"d",
      months:[],
      monthDays:[],
      weekDays:['mo'],
      interval:1
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('Repeated daily. On the following day(s) of the week: Monday. ')
  })

  it('daily, in September and November', () => {
    const sch = {
      startEvent: "consent",
      startDelaySecs: 0,
      untilSecs:0,
      intervalType:"d",
      months:[9, 11],
      monthDays:[],
      weekDays:[],
      interval:1
    }
    let string = schedulingToString(sch, 'en')
    expect(string).toBe('Repeated daily. In the following month(s): September, November. ')
  })
})
