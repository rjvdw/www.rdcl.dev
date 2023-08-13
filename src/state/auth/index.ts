import { signal } from '@preact/signals'
import { Jwt } from './Jwt.ts'
import {
  isValidLoginResponseBody,
  isValidVerifyResponseBody,
  loggedOutState,
} from './types.ts'
import { getInitialState, getLoggedInState, post } from './util.ts'

export { Jwt }

export const auth = signal(getInitialState())

export async function startLogin(user: string) {
  const body = await post(
    '/auth/login',
    {
      email: user,
      callback: `${window.location.origin}/login/verify`,
    },
    isValidLoginResponseBody,
  )

  localStorage.sessionToken = body.sessionToken
}

export async function completeLogin(verificationCode: string) {
  if (!(typeof localStorage.sessionToken === 'string')) {
    throw new Error('No session token available')
  }

  const body = await post(
    '/auth/login/verify',
    {
      'session-token': localStorage.sessionToken,
      'verification-code': verificationCode,
    },
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
