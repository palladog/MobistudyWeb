export default {
  privacyPolicy: {
    collectedData: `What personal data will be collected?
\u2022 Your general profile information like email address, name, surname, date of birth, country, language, main health conditions, long-term treatments and lifestyle.
\u2022 Your participation into the studies and the times you complete a task.
\u2022 Technical information about access to the server (like logins) for security and auditing.`,
    collectedDataForm: `\u2022 Answers given to {formName} form.`,
    collectedDataQuery: `\u2022 {dataType} from GoogleFit (Android phones) or HealthKit (iPhones).`,
    storage: `Where will this data be stored?
On your phone:
\u2022 Your profile
\u2022 Your participation activity into the studies and their tasks
On Mobistudy servers:
\u2022 All the data mentioned before.
\u2022 Security and auditing information.
Mobistudy servers are managed by the University of Malmö and located in Sweden.`,
    access: `Who will have access to this data?
\u2022 Personnell from the University of Malmö. Reason: technical maintenance and auditing.`,
    accessInstitution: `\u2022 {institution}`,
    accessReason: `. Reason: {reason}`,
    rights: `What are my rights?
\u2022 You can withdraw from this study whenever you want. The data you have produced so far will be kept.
\u2022 You can remove your account from Mobistudy. This will remove all your data, produced in all the studies, except the technical logs (which need to be kept for security reasons, but will be deleted after 5 years).
\u2022 You can download the data in a machine-readable format. Contact info@mobistudy.org if you need to.`,
    contacts: `For any other general question, please contact one of the principal investigators:`,
    piContact: `{name} at: {contact}`
  },
  consent: {
    taskItemDataQuery: `I agree to send my data about {dataType}, {scheduling}`,
    taskItemForm: `I agree to answer the {formName} form, {scheduling}`,
    taskItemMiBand3: `I agree to send my data collected by the MiBand3 bracelet`
  },
  scheduling: {
    notDefined: 'Not defined yet',
    fromDaysConsented: `The day after you have consented | {n} days after you have consented`,
    untilDaysConsented: `Until {days} days after you have consented`,
    occurrences: `Repeated {occurrences} times`,
    repeatedDays: `Repeated daily | Repeated every {n} days`,
    repeatedWeeks: `Repeated weekly | Repeated every {n} weeks`,
    repeatedMonths: `Repeated monthly | Repeated every {n} months`,
    repeatedYears: `Repeated every year | Repeated every {n} years`,
    onMonths: `In the following month(s)`,
    onDaysMonth: `On the following day(s) of the month`,
    onDaysWeek: `On the following day(s) of the week`
  },
  months: {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  },
  weekDays: {
    mo: 'Monday',
    tu: 'Tuesday',
    we: 'Wednesday',
    th: 'Thursday',
    fr: 'Friday',
    sa: 'Saturday',
    su: 'Sunday'
  },
  healthDataTypes: {
    steps: 'Steps',
    weight: 'Weight',
    height: 'Height',
    activity: 'Activity',
    heart_rate: 'Heart rate',
    heart_rate_variability: 'Heart rate variability',
    calories: 'Calories',
    distance: 'Distance walked or run'
  }
}
