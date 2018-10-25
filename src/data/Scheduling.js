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
  if (sc.months) {
    // TODO: output "on the following months: "
  }
  if (sc.monthDays) {
    // TODO: output "on the following days of the month: "
  }
  if (sc.weekDays) {
    // TODO: output "on the following days of the week: "
  }

  return s
}
