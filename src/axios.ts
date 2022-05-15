import Axios from 'axios'
import netlifyIdentity from 'netlify-identity-widget'

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
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['authorization'] = `Bearer ${ token }`
    }

    return config
  },

  error => Promise.reject(error),
)
