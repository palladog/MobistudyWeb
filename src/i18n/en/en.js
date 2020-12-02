export default {
  privacyPolicy: {
    collectedData: `To conduct this study, we need to collect some data from you using the Mobistudy app.
    What personal data will be collected?
\u2022 Your general profile information like email address, name, surname, date of birth, sex, country, language, main health conditions, long-term treatments, weight and height.
These are needed to identify you and to create statistics about those who participate in this study.
\u2022 Your participation in the study and the times you complete a task.
These are needed to assess your level of involvement into the study.
\u2022 Technical information about access to the server (like logins).
These are needed for security and auditing.
\u2022 Data collected within the tasks assigned in this study, concretely: 
`,
    collectedDataForm: `    \u2022 Answers given to {formName} form.`,
    collectedDataQuery: `    \u2022 {dataType} from GoogleFit (Android phones) or HealthKit (iPhones).`,
    collectedDataQCST: `    \u2022 Heart rate and steps collected during a Queens College Step Test.`,
    collectedDataSMWT: `    \u2022 Your geographical position, distance and steps during the Six-minute Walk Test`,
    collectedDataMiband3: `    \u2022 Your heart rate, activity level, steps and activity type collected by the MiBand3 fitness tracker.`,
    collectedDataReason: `These data are needed to fulfil the aims of the research. [ADD REASONS FOR WHY THESE DATA ARE NEEDED IN THE SPECIFIC STUDY]`,
    storage: `All these data will be stored on the Mobistudy servers, which are managed by the University of Malmö in Sweden. Your phone will keep your profile and data about your participation in the studies only.

For how long will this data be kept?
Your profile and participation in the study will be kept for as long as you will keep an account on Mobistudy.
Data collected within the tasks assigned in this study will be kept on the Mobistudy servers until the end of the study, on {studyEndDate}.
Technical logs will be deleted after 1 year they are produced.

[SPECIFY FOR HOW LONG STUDY DATA WILL BE KEPT BY RESEARCHERS]
`,
    access: `Who will have access to this data?
\u2022 Personnel from the University of Malmö for technical maintenance and auditing (Malmö University is the processor of your personal information).`,
    accessInstitution: `\u2022 {institution}`,
    accessReason: ` for {reason} ({institution} is the controller of your personal information).`,
    rights: `What are my rights?
\u2022 You can withdraw from this study whenever you want by accessing the “studies” section of this app. The data you have produced so far within the study will be kept, but if you want them to be removed contact mobistudy@mau.se.
\u2022 You can remove your account from Mobistudy by accessing the “profile” section of this app. This will remove all your data collected by Mobistudy except the technical logs, which will be deleted after 1 year. Be aware that data already downloaded by institutions involved in this or past studies may still keep your data after you have removed your account. If you want these data to be deleted, please contact mobistudy@mau.se.
\u2022 You can ask the processing of your data to be stopped or restricted (even without deleting your account). In this case contact mobistudy@mau.se.
\u2022 You can find out what has been registered about you and download the data in a machine-readable format by contacting mobistudy@mau.se.
\u2022 You can ask errors in your data to be corrected. In this case write to mobistudy@mau.se.
\u2022 If you have complaints that cannot be resolved with Malmö University you may submit these to Datainspektionen.`,
    contacts: `For questions about how data is processed by each institution involved in the study please contact:
\u2022 Malmö University, at: dataskyddsombud@mau.se`,
    piContact: `\u2022 {name} at: {contact}`
  },
  consent: {
    taskItemDataQuery: `I agree to send my data about {dataType}, {scheduling}`,
    taskItemForm: `I agree to answer the {formName} form, {scheduling}`,
    taskItemMiBand3: `I agree to send my data collected by the MiBand3 fitness tracker, {scheduling}`
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
