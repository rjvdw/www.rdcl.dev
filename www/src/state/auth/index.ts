import { signal } from '@preact/signals'
import { Api, getBody } from '../../util/http'
import { Jwt } from './Jwt'
import {
  isValidLoginResponseBody,
  isValidVerifyResponseBody,
  loggedOutState,
} from './types'
import { getInitialState, getLoggedInState } from './util'

export { Jwt }

export const auth = signal(getInitialState())

export async function startLogin(user: string, api: Api) {
  const body = await getBody(
    await api.post(
      '/auth/login',
      new URLSearchParams({
        email: user,
        callback: `${window.location.origin}/login/verify`,
      }),
    ),
    isValidLoginResponseBody,
  )

  localStorage.sessionToken = body.sessionToken
}

export async function completeLogin(verificationCode: string, api: Api) {
  if (!(typeof localStorage.sessionToken === 'string')) {
    throw new Error('No session token available')
  }

  const body = await getBody(
    await api.post(
      '/auth/login/verify',
      new URLSearchParams({
        'session-token': localStorage.sessionToken,
        'verification-code': verificationCode,
      }),
    ),
    isValidVerifyResponseBody,
  )

  const jwt = new Jwt(body.jwt)
  if (!jwt.expired) {
    delete localStorage.sessionToken
    localStorage.jwt = body.jwt
    auth.value = getLoggedInState(jwt)
  } else {
    await logout()
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function logout() {
  auth.value = loggedOutState
  delete localStorage.jwt
}
