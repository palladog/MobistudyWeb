const DayOfWeekEnum = {
  values: [ 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su' ],
  valueToString (v) {
    if (v === 'mo') return 'Monday'
    if (v === 'tu') return 'Tuesday'
    if (v === 'we') return 'Wednesday'
    if (v === 'th') return 'Thursday'
    if (v === 'fr') return 'Friday'
    if (v === 'sa') return 'Saturday'
    if (v === 'su') return 'Sunday'
  },
  stringToValue (s) {
    if (s === 'Monday') return 'mo'
    if (s === 'Tuesday') return 'tu'
    if (s === 'Wednesday') return 'we'
    if (s === 'Thursday') return 'th'
    if (s === 'Friday') return 'fr'
    if (s === 'Saturday') return 'sa'
    if (s === 'Sunday') return 'su'
  }
}

// TODO: create a MonthsEnum

export function schedulingToString (sc) {
  if (!sc.startEvent) return 'Not defined yet'

  let s = ''
  if (sc.startEvent === 'consent') {
    if (sc.startDelaySecs) {
      let daysFormConsent = Math.floor(sc.startDelaySecs / (24 * 60 * 60))
      if (daysFormConsent === 0) s += 'From when you have consented. '
      else if (daysFormConsent === 1) s += 'The day after you have consented. '
      else s += daysFormConsent + ' days after you have consented. '
    }
    if (sc.untilSecs) {
      let untilFromConsent = Math.floor(sc.untilSecs / (24 * 60 * 60))
      s += `Until ${untilFromConsent} days after you have consented. `
    }
  }

  if (sc.occurrences) {
    s += `Repeated ${sc.occurrences} times. `
  }

  if (sc.intervalType === 'd' && sc.interval) {
    if (sc.interval === 1) s += `Repeated daily.`
    else s += `Repeated every ${sc.interval} days.`
  }
  if (sc.intervalType === 'w' && sc.interval) {
    if (sc.interval === 1) s += `Repeated weekly.`
    else s += `Repeated every ${sc.interval} weeks.`
  }
  if (sc.intervalType === 'm' && sc.interval) {
    if (sc.interval === 1) s += `Repeated monthly.`
    else s += `Repeated every ${sc.interval} months.`
  }
  if (sc.intervalType === 'y' && sc.interval) {
    if (sc.interval === 1) s += `Repeated every year.`
    else s += `Repeated every ${sc.interval} years.`
  }
  if (sc.months && sc.months.length) {
    // TODO: output "on the following months: "
  }
  if (sc.monthDays && sc.monthDays.length) {
    s += ' On '
    let days = sc.monthDays.reduce((acc, d, index) => {
      let r = index === 0 ? '' : ', '
      return (acc += r + d)
    }, '')
    s += days
  }
  if (sc.weekDays && sc.weekDays.length) {
    s += ' On '
    let days = sc.weekDays.reduce((acc, d, index) => {
      let r = index === 0 ? '' : ', '
      return (acc += r + DayOfWeekEnum.valueToString(d))
    }, '')
    s += days
  }

  return s
}

export { DayOfWeekEnum }
