export const loggedOutState = { loggedIn: false } as const

export type LoggedInAuthState = {
  loggedIn: true
  jwt: string
}

export type AuthState = typeof loggedOutState | LoggedInAuthState

export type LoginResponseBody = {
  sessionToken: string
}

export function isValidLoginResponseBody(
  body: unknown,
): body is LoginResponseBody {
  if (!body) return false

  // noinspection SuspiciousTypeOfGuard
  return typeof (body as LoginResponseBody).sessionToken === 'string'
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
