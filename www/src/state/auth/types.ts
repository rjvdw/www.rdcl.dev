import { Jwt } from './Jwt'

export const loggedOutState = { loggedIn: false } as const

export type LoggedInAuthState = {
  loggedIn: true
  jwt: Jwt
}

export type AuthState = typeof loggedOutState | LoggedInAuthState

export type LoginResponseBody = {
  mode: 'EMAIL' | 'AUTHENTICATOR'
  payload: string
}

export function isValidLoginResponseBody(
  body: unknown,
): body is LoginResponseBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'mode' in body &&
    (body.mode === 'EMAIL' || body.mode === 'AUTHENTICATOR') &&
    'payload' in body &&
    typeof body.payload === 'string'
  )
}

export type LoginVerifyResponseBody = {
  jwt: string
}

export function isValidVerifyResponseBody(
  body: unknown,
): body is LoginVerifyResponseBody {
  if (!body) return false

  // noinspection SuspiciousTypeOfGuard
  return typeof (body as LoginVerifyResponseBody).jwt === 'string'
}
