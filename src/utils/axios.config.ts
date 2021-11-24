import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://apple-tv-assets.iamprompt.me' : 'http://localhost:3000'

axios.defaults.baseURL = BASE_URL

export default axios
