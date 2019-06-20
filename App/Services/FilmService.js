import axios from 'axios'
import { Config } from 'App/Config'
const API_TOKEN = '7c83d8b76850d635f9ceda04e03b9d2f'

const filmsApiClient = axios.create({
  baseURL: Config.TMDB_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})
const imageApiClient = axios.create({
  baseURL: Config.TMDB_API_IMG_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

// imageApiClient.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     console.log(config)
//     return config
//   },
//   function(error) {
//     // Do something with request error
//     console.log('azazazaz')
//     return Promise.reject(error)
//   }
// )

function getFilmsFromApiWithSearchedText(text, page) {
  textParameter = encodeURIComponent(text.trim())
  const url =
    '/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + textParameter + '&page=' + page

  // console.log('url', url)

  return filmsApiClient
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error))
}

async function getImageFromApi(name) {
  return await imageApiClient
    .get(name)
    .then((response) => {
      console.log('FilmService : getImage', response)
      // response.json()
    })
    .catch((error) => console.error(error))
}

function getFilmDetailFromApi(id) {
  const url = '/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
  return filmsApiClient
    .get(url)
    .then((response) => response.data) //déjà en json
    .catch((error) => console.error(error))
}

export const filmService = {
  getFilmsFromApiWithSearchedText,
  getImageFromApi,
  getFilmDetailFromApi,
}
