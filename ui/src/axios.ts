import Axios from 'axios'

export const axios = Axios.create()

const ACCESS_TOKEN_KEY = 'auth:at'
const REFRESH_TOKEN_KEY = 'auth:rt'
const STORAGE = window.localStorage

export function clearAuthData() {
  delete STORAGE[ACCESS_TOKEN_KEY]
  delete STORAGE[REFRESH_TOKEN_KEY]
  window.dispatchEvent(new CustomEvent('auth-logout'))
}

export function hasAuthData(): boolean {
  const accessToken = STORAGE[ACCESS_TOKEN_KEY]
  const refreshToken = STORAGE[REFRESH_TOKEN_KEY]

  return Boolean(accessToken && refreshToken && !isExpired(refreshToken))
}

function isExpired(token: string|null): boolean {
  if (!token) return false

  const [, base64] = token.split('.', 2)
  const decoded = atob(base64)
  const parsed = JSON.parse(decoded)

  return Boolean(token && parsed.exp * 1000 < Date.now())
}

export function isAuthStorageKey(key: string|null): boolean {
  return key === ACCESS_TOKEN_KEY || key === REFRESH_TOKEN_KEY
}

// append authorization and x-refresh-token headers
axios.interceptors.request.use(
  config => {
    if (hasAuthData()) {
      config.headers!['authorization'] = `bearer ${ STORAGE[ACCESS_TOKEN_KEY] }`
      config.headers!['x-refresh-token'] = STORAGE[REFRESH_TOKEN_KEY]
    }

    return config
  },

  error => Promise.reject(error),
)

// extract x-access-token and x-refresh-token headers
axios.interceptors.response.use(
  response => {
    if (response.headers['x-access-token']) {
      STORAGE[ACCESS_TOKEN_KEY] = response.headers['x-access-token']
      STORAGE[REFRESH_TOKEN_KEY] = response.headers['x-refresh-token']
    }

    return response
  },

  error => {
    if (error.response.status === 401) {
      setTimeout(() => clearAuthData(), 5) // async call to give components the chance to handle the response
    }
    return Promise.reject(error)
  },
)
