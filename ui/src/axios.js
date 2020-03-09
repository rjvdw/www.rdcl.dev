import Axios from 'axios'

export const axios = Axios.create({
  baseURL: '/.netlify/functions/',
})

// append authorization and x-refresh-token headers
axios.interceptors.request.use(
  (config) => {
    const fromStorage = window.localStorage.getItem('auth')

    if (fromStorage) {
      try {
        const { accessToken, refreshToken } = JSON.parse(fromStorage)

        if (accessToken) {
          config.headers['authorization'] = `bearer ${ accessToken }`
          config.headers['x-refresh-token'] = refreshToken
        }
      } catch (err) {
        console.warn(err)
        window.localStorage.removeItem('auth')
      }
    }

    return config
  },

  (error) => Promise.reject(error),
)

// extract x-access-token and x-refresh-token headers
axios.interceptors.response.use(
  (response) => {
    if (response.headers['x-access-token']) {
      const accessToken = response.headers['x-access-token']
      const refreshToken = response.headers['x-refresh-token']

      window.localStorage.setItem('auth', JSON.stringify({ accessToken, refreshToken }))
    }

    // FIXME: clear tokens from local storage if expired/invalidated/...

    return response
  },

  (error) => Promise.reject(error),
)
