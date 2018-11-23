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
  async saveDraftStudyDesign (design) {
    return axios.post(BASE_URL + '/studies', design, axiosConfig)
  },
  async updateDraftStudyDesign (studyKey, design) {
    return axios.put(BASE_URL + '/studies/' + studyKey, design, axiosConfig)
  },
  async publishStudyDesign (design) {
    return axios.post(BASE_URL + '/studies', design, axiosConfig)
  },
  async getStudyDescription (teamKey, studyKey) {
    let resp = await axios.get(BASE_URL + '/studies/' + teamKey + '/' + studyKey, axiosConfig)
    return resp.data
  },
  async getStudies () {
    let resp = await axios.get(BASE_URL + '/studies/', axiosConfig)
    return resp.data
  },
  async getAllTeamStudies (teamKey) {
    let resp = await axios.get(BASE_URL + '/studies/' + teamKey, axiosConfig)
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
  }
}
