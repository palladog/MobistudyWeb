import axios from 'axios'

const BASE_URL = '/api'

export default {

  async saveDraftStudyDesign (design) {
    return axios.post(BASE_URL + '/studies', design)
  },
  async updateDraftStudyDesign (studyKey, design) {
    return axios.put(BASE_URL + '/studies/' + studyKey, design)
  },
  async publishStudyDesign (design) {
    return axios.post(BASE_URL + '/studies', design)
  },
  async getStudyDescription (studyKey) {
    let resp = await axios.get(BASE_URL + '/studies/' + studyKey)
    return resp.data
  },
  async getSpecificForm (formKey) {
    let resp = await axios.get(BASE_URL + '/forms/' + formKey)
    return resp.data
  },
  async getFormsList () {
    let resp = await axios.get(BASE_URL + '/forms?list=true')
    return resp.data
  },
  async publishForm (form) {
    return axios.post(BASE_URL + '/forms', form)
  }
}
