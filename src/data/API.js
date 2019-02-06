import axios from 'axios'

const BASE_URL = '/api'
var axiosConfig = {}

export default {
  setToken (newtoken) {
    axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + newtoken
      }
    }
    console.log('set token', axiosConfig)
  },
  async login (email, password) {
    let resp = await axios.post(BASE_URL + '/login', { email: email, password: password })
    return resp.data
  },
  async sendRegistrationConfirmation (email) {
    return axios.post(BASE_URL + '/sendConfirmationEmail', { email: email })
  },
  async askPasswordResetEmail (email) {
    return axios.post(BASE_URL + '/sendResetPasswordEmail', { email: email })
  },
  async resetPassword (token, newpassword) {
    return axios.post(BASE_URL + '/resetPassword', { token: token, password: newpassword })
  },
  async createUser (newuser) {
    return axios.post(BASE_URL + '/users', newuser)
  },
  /// ////////////////////////////////////
  // from here on, we need to use tokens
  /// ////////////////////////////////////
  async createTeam (teamName) {
    return axios.post(BASE_URL + '/teams', {
      name: teamName
    }, axiosConfig)
  },
  async getTeams () {
    let resp = await axios.get(BASE_URL + '/teams', axiosConfig)
    return resp.data
  },
  async generateTeamCode (teamKey) {
    let resp = await axios.get(BASE_URL + '/teams/invitationCode/' + teamKey, axiosConfig)
    return resp.data
  },
  async addUserToTeam (invitationCode) {
    return axios.post(BASE_URL + '/teams/researcher/add', { invitationCode: invitationCode }, axiosConfig)
  },
  async removeUserFromTeam (userRemoved) {
    return axios.post(BASE_URL + '/teams/researcher/remove', { userRemoved: userRemoved }, axiosConfig)
  },
  async deleteTeam (teamKey) {
    let resp = await axios.delete(BASE_URL + '/teams/' + teamKey, axiosConfig)
    return resp.data
  },
  // USER
  async getUserByKey (userKey) {
    let resp = await axios.get(BASE_URL + '/users/' + userKey, axiosConfig)
    return resp.data
  },
  async getAllDbUsers () {
    let resp = await axios.get(BASE_URL + '/users/all', axiosConfig)
    return resp.data
  },
  async deleteUser (userKey) {
    let resp = await axios.delete(BASE_URL + '/users/' + userKey, axiosConfig)
    return resp.data
  },
  // STUDY
  async saveDraftStudy (design) {
    return axios.post(BASE_URL + '/studies', design, axiosConfig)
  },
  async updateDraftStudy (studyKey, design) {
    return axios.put(BASE_URL + '/studies/' + studyKey, design, axiosConfig)
  },
  async publishStudy (design) {
    return axios.post(BASE_URL + '/studies', design, axiosConfig)
  },
  async getStudy (studyKey) {
    let resp = await axios.get(BASE_URL + '/studies/' + studyKey, axiosConfig)
    return resp.data
  },
  async getStudies () {
    let resp = await axios.get(BASE_URL + '/studies/', axiosConfig)
    return resp.data
  },
  async getAllTeamStudies (teamKey) {
    let resp = await axios.get(BASE_URL + '/studies?teamKey=' + teamKey, axiosConfig)
    return resp.data
  },
  async deleteStudy (studyKey) {
    let resp = await axios.delete(BASE_URL + '/studies/' + studyKey, axiosConfig)
    return resp.data
  },
  // FORMS
  async getSpecificForm (formKey) {
    let resp = await axios.get(BASE_URL + '/forms/' + formKey, axiosConfig)
    return resp.data
  },
  async getFormsList () {
    let resp = await axios.get(BASE_URL + '/forms?list=true', axiosConfig)
    return resp.data
  },
  async publishForm (form) {
    return axios.post(BASE_URL + '/forms', form, axiosConfig)
  },
  // PARTICIPANT
  async getOneParticipant (userKey) {
    let resp = await axios.get(BASE_URL + '/participants/byuserkey/' + userKey, axiosConfig)
    return resp.data
  },
  async getParticipants () {
    let resp = await axios.get(BASE_URL + '/participants', axiosConfig)
    return resp.data
  },
  async getParticipantsOfStudy (studyKey, currentStatus) {
    let resp
    if (currentStatus) {
      resp = await axios.get(BASE_URL + '/participants?studyKey=' + studyKey + '&currentStatus=' + currentStatus, axiosConfig)
    } else {
      resp = await axios.get(BASE_URL + '/participants?studyKey=' + studyKey, axiosConfig)
    }
    return resp.data
  },
  async removeParticipantFromStudy (participantRemoved) {
    return axios.put(BASE_URL + '/participants/action/withdraw', { withdrawnOne: participantRemoved }, axiosConfig)
  },
  async deleteParticipant (participantKey) {
    let resp = await axios.delete(BASE_URL + '/participants/' + participantKey, axiosConfig)
    return resp.data
  }
}
