import { signal } from '@preact/signals'
import {
  isValidLoginResponseBody,
  isValidVerifyResponseBody,
  loggedOutState,
} from './types.ts'
import { getInitialState, getLoggedInState, isValid, post } from './util.ts'

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

  if (isValid(body.jwt)) {
    delete localStorage.sessionToken
    localStorage.jwt = body.jwt
    auth.value = getLoggedInState(body.jwt)
  } else {
    await logout()
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function logout() {
  auth.value = loggedOutState
  delete localStorage.jwt
}
