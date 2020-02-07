import { i18n } from '../boot/i18n.js'

export function schedulingToString (sc, lang) {
  if (!sc.startEvent) return i18n.t('scheduling.notDefined', lang)

  let s = ''
  if (sc.startEvent === 'consent') {
    if (sc.startDelaySecs) {
      let daysFormConsent = Math.floor(sc.startDelaySecs / (24 * 60 * 60))
      s += i18n.tc('scheduling.fromDaysConsented', daysFormConsent, lang) + '. '
    }
    if (sc.untilSecs) {
      let untilFromConsent = Math.floor(sc.untilSecs / (24 * 60 * 60))
      s += i18n.t('scheduling.untilDaysConsented', lang, { days: untilFromConsent}) + '. '
    }
  }
  if (sc.occurrences) {
    s += i18n.t('scheduling.occurrences', lang, { occurrences: sc.occurrences }) + '. '
  }
  if (sc.intervalType === 'd' && sc.interval) {
    s += i18n.tc('scheduling.repeatedDays', sc.interval, lang) + '. '
  } else if (sc.intervalType === 'w' && sc.interval) {
    s += i18n.tc('scheduling.repeatedWeeks', sc.interval, lang) + '. '
  } else if (sc.intervalType === 'm' && sc.interval) {
    s += i18n.tc('scheduling.repeatedMonths', sc.interval, lang) + '. '
  } else if (sc.intervalType === 'y' && sc.interval) {
    s += i18n.tc('scheduling.repeatedYears', sc.interval, lang) + '. '
  }
  if (sc.months && sc.months.length) {
    s += i18n.t('scheduling.onMonths', lang) + ': '
    let mths = sc.months.reduce((acc, d, index) => {
      let r = index === 0 ? '' : ', '
      return (acc += r + i18n.t('months.' + d, lang))
    }, '')
    s += mths + '. '
  }
  if (sc.monthDays && sc.monthDays.length) {
    s += i18n.t('scheduling.onDaysMonth', lang) + ': '
    let days = sc.monthDays.reduce((acc, d, index) => {
      let r = index === 0 ? '' : ', '
      return (acc += r + d)
    }, '')
    s += days + '. '
  }
  if (sc.weekDays && sc.weekDays.length) {
    s += i18n.t('scheduling.onDaysWeek', lang) + ': '
    let days = sc.weekDays.reduce((acc, d, index) => {
      let r = index === 0 ? '' : ', '
      return (acc += r + i18n.t('weekDays.' + d, lang))
    }, '')
    s += days + '. '
  }

  return s
}
