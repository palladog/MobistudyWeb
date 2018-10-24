/*
* Allows connection to the API.
*/
import axios from 'axios'

export default {
  // Create a new study
  createNewStudy (newstudy) {
    var url = '/api/studies'
    axios.post(url, newstudy)
      .then((response) => {
        let resp = response.data
        console.log(typeof resp._key)
        let keyVal = resp._key
        return keyVal
      })
  }

  // router.get('/studies')
  // router.get('/studies/:study_key'
  // router.post('/studies'
  // router.put('/studies/:study_key'
  // router.patch('/studies/:study_key'
  // router.delete('/studies/:study_key'
}