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

const MonthOfYearEnum = {
  values: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
  valueToString (v) {
    if (v === '1') return 'January'
    if (v === '2') return 'February'
    if (v === '3') return 'March'
    if (v === '4') return 'April'
    if (v === '5') return 'May'
    if (v === '6') return 'June'
    if (v === '7') return 'July'
    if (v === '8') return 'August'
    if (v === '9') return 'September'
    if (v === '10') return 'October'
    if (v === '11') return 'November'
    if (v === '12') return 'December'
  },
  stringToValue (s) {
    if (s === 'January') return '1'
    if (s === 'February') return '2'
    if (s === 'March') return '3'
    if (s === 'April') return '4'
    if (s === 'May') return '5'
    if (s === 'June') return '6'
    if (s === 'July') return '7'
    if (s === 'August') return '8'
    if (s === 'September') return '9'
    if (s === 'October') return '10'
    if (s === 'November') return '11'
    if (s === 'December') return '12'
  }
}

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
    s += ' On the following month(s): '
    let mths = sc.months.reduce((acc, d, index) => {
      let r = index === 0 ? '' : ', '
      return (acc += r + MonthOfYearEnum.valueToString(d))
    }, '')
    s += mths + '.'
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

export { DayOfWeekEnum, MonthOfYearEnum }
