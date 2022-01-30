import netlifyIdentity, { User } from 'netlify-identity-widget'
import { store } from './store'
import { setAuthenticated, setUnauthenticated, UserData } from './modules/auth'

netlifyIdentity.on('init', (user) => {
  if (user === null) {
    console.log('[netlify:identity][init] user logged out')
    store.dispatch(setUnauthenticated())
  } else {
    console.log('[netlify:identity][init] user logged in')
    store.dispatch(setAuthenticated(mapUserData(user)))
  }
})

netlifyIdentity.on('login', (user) => {
  console.log('[netlify:identity][login] user logged in')
  store.dispatch(setAuthenticated(mapUserData(user)))
})

netlifyIdentity.on('logout', () => {
  console.log('[netlify:identity][logout] user logged out')
  store.dispatch(setUnauthenticated())
})

netlifyIdentity.init({
  APIUrl: `${ process.env.URL }/.netlify/identity`,
})

function mapUserData(user: User): UserData {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    meta: {
      avatar: user.user_metadata.avatar_url,
      name: user.user_metadata.full_name,
    },
  }
}

export const logout = () => {
  netlifyIdentity.logout()
}

export const login = () => {
  netlifyIdentity.open('login')
}
