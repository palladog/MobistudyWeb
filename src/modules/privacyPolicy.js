import QueryDataTypeEnum from './QueryDataTypeEnum'

export default {
  createPrivacyPolicy (principalInvestigators, institutions, tasks) {
    let investigators = principalInvestigators
    let stringInv = ''
    if (investigators.length > 0) {
      for (let i = 0; i < investigators.length; i++) {
        stringInv += '\n\u2022 ' + investigators[i].name
        stringInv += ' and their contact details are: ' + investigators[i].contact
      }
    }
    let stringInsti = ''
    if (institutions.length > 0) {
      for (let j = 0; j < institutions.length; j++) {
        stringInsti += '\n\u2022 ' + institutions[j].name
        stringInsti += ' would like ' + institutions[j].dataAccess + ' data Acccess. '
        stringInsti += '\n Reason: ' + institutions[j].reasonForDataAccess
      }
    }
    let stringTasks = ''
    if (tasks.length > 0) {
      for (let k = 0; k < tasks.length; k++) {
        let taskType = tasks[k].type
        if (taskType === 'dataQuery') {
          stringTasks += '\n\u2022 ' + QueryDataTypeEnum.valueToString(tasks[k].dataType) + ' from GoogleFit (Android phones) or HealthKit (iPhones)'
        }
        if (taskType === 'form') {
          stringTasks += '\n\u2022 answers given to ' + tasks[k].formName + ' form'
        }
      }
    }
    let stringData = 'What personal data will be collected?'
    stringData += '\n\u2022 Your general profile information like email address, name, surname, date of birth, main health conditions, long-term treatments and lifestyle.'
    stringData += '\n\u2022 Your participation into the studies and the times you complete a task.'
    stringData += stringTasks

    let stringStorage = '\nWhere will this data be stored?'
    stringStorage += '\n On your phone: '
    stringStorage += '\n\u2022 Your profile'
    stringStorage += '\n\u2022 Your participation activity into the studies and their tasks'
    stringStorage += '\n On Mobistudy servers: '
    stringStorage += '\n\u2022 All the data mentioned before'
    stringStorage += '\n\u2022 Technical information about access to the server (eg logins) for security reasons'

    let stringAccess = '\nWho will have access to this data?'
    stringAccess += '\n The following institution(s) will have access: '
    stringAccess += stringInsti

    let stringRights = '\nWhat are my rights?'
    stringRights += '\n\u2022 You can withdraw from this study whenever you want. The data you have produced so far will be kept.'
    stringRights += '\n\u2022 You can remove your account from Mobistudy. This will remove all your data, produced in all the studies, except the technical logs (which need to be kept for security reasons, but will be deleted after 5 years).'
    stringRights += '\n\u2022 You can download the data in a machine-readable format. Contact snatpht@gmail.com if you need to.'
    stringRights += '\n For any other general question, please contact one of the principal investigators: '
    stringRights += stringInv
    let stringPolicy = stringData + '\n' + stringStorage + '\n' + stringAccess + '\n' + stringRights
    return stringPolicy
  }
}
