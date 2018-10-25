import axios from 'axios'

const BASE_URL = '/api'

export default {

  async saveDraftStudyDesign (design) {
    // TODO: return await axios....
  },
  async publishStudyDesign (design) {

  },
  async getFormsList () {
    let resp = await axios.get(BASE_URL + '/forms?list=true')
    return resp.data
  }
}
