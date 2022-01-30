import netlifyIdentity from 'netlify-identity-widget'
import Axios from 'axios'
import * as net from 'net'

export const axios = Axios.create()
window.axios = axios

export function hasAuthData(): boolean {
  const user = netlifyIdentity.currentUser()

  return Boolean(user?.token?.access_token && user?.token?.expires_in > 0)
}

// append authorization header
axios.interceptors.request.use(
  async (config) => {
    if (hasAuthData()) {
      const token = await netlifyIdentity.refresh()
      config.headers!['authorization'] = `Bearer ${ token }`
    }

    return config
  },

  error => Promise.reject(error),
)
