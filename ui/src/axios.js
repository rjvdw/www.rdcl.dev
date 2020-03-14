import Axios from 'axios'

export const axios = Axios.create({
  baseURL: '/.netlify/functions/',
})

const ACCESS_TOKEN_KEY = 'auth:at'
const REFRESH_TOKEN_KEY = 'auth:rt'
const STORAGE = window.localStorage

export function clearAuthData() {
  delete STORAGE[ACCESS_TOKEN_KEY]
  delete STORAGE[REFRESH_TOKEN_KEY]
  window.dispatchEvent(new CustomEvent('auth-logout'))
}

export function hasAuthData() {
  const accessToken = STORAGE[ACCESS_TOKEN_KEY]
  const refreshToken = STORAGE[REFRESH_TOKEN_KEY]

  return !!(accessToken && refreshToken)
}

export function isAuthStorageKey(key) {
  return key === ACCESS_TOKEN_KEY || key === REFRESH_TOKEN_KEY
}

// append authorization and x-refresh-token headers
axios.interceptors.request.use(
  (config) => {
    if (hasAuthData()) {
      config.headers['authorization'] = `bearer ${ STORAGE[ACCESS_TOKEN_KEY] }`
      config.headers['x-refresh-token'] = STORAGE[REFRESH_TOKEN_KEY]
    }

    return config
  },

  (error) => Promise.reject(error),
)

// extract x-access-token and x-refresh-token headers
axios.interceptors.response.use(
  (response) => {
    if (response.headers['x-access-token']) {
      STORAGE[ACCESS_TOKEN_KEY] = response.headers['x-access-token']
      STORAGE[REFRESH_TOKEN_KEY] = response.headers['x-refresh-token']
    }

    if (response.status === 401) {
      clearAuthData()
    }

    return response
  },

  (error) => Promise.reject(error),
)
