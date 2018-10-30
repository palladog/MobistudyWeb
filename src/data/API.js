import axios from 'axios'

const BASE_URL = '/api'

export default {

  async saveDraftStudyDesign (design) {
    await axios.post(BASE_URL + '/studies', design)
    // TODO: return await axios....
  },
  async updateDraftStudyDesign (studyKey) {
    await axios.put(BASE_URL + '/studies/' + studyKey)
  },
  async publishStudyDesign (design) {
    await axios.post(BASE_URL + '/studies', design)
  },
  async getStudyDescription (studyKey) {
    let resp = await axios.get(BASE_URL + '/studies/' + studyKey)
    return resp.data
  },
  async getFormsList () {
    let resp = await axios.get(BASE_URL + '/forms?list=true')
    return resp.data
  },
  async publishForm (form) {
    await axios.post(BASE_URL + '/forms', form)
  }
}
