import { Jwt } from './Jwt'
import { AuthState, LoggedInAuthState, loggedOutState } from './types'

export function getInitialState(): AuthState {
  if (typeof localStorage.jwt === 'string') {
    const jwt = new Jwt(localStorage.jwt)

    if (jwt.expired) {
      delete localStorage.jwt
    } else {
      return getLoggedInState(jwt)
    }
  }

  return loggedOutState
}

export function getLoggedInState(jwt: Jwt): LoggedInAuthState {
  return {
    loggedIn: true,
    jwt,
  }
}
