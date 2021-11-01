import axios from "axios"

export function httpRequest(
  uri,
  verb,
  data
) {
  document.body.style.cursor = "wait"
  let responseType = "json"
  let url = "http://localhost:5003" + uri;

  return axios({
    method: verb,
    url: url,
    data: data,
    responseType: responseType
  })
    .then(function (response) {
      document.body.style.cursor = "default"
      return response
    })
    .catch(function (err) {
      document.body.style.cursor = "default"
      throw err
    })
}