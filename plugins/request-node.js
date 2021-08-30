import axios from 'axios'

export default (context, inject) => {
  inject('apiRequest', data => apiRequest(data))
}


/* API REQUEST */
async function apiRequest({ api, method, req }) {
  try {
    let reqData = {}

    if (process.server) {
      reqData.url = process.env.REST_API + '?f=' + method
      reqData.params = { arg: req }
    }
    else {
      reqData.url = process.env.NODE_API + api
      reqData.params = req
    }

    const { data } = await axios.post(reqData.url, reqData.params)

    if (data.error || data.name == "Error") {
      console.log('API request error:', data.message)
    }

    return data
  }
  
  catch (error) {
    console.log('network error:',  error)

    return { error: error }
  }
}
