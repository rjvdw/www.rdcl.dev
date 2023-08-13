import { Jwt } from './Jwt.ts'
import { AuthState, LoggedInAuthState, loggedOutState } from './types.ts'

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

export async function post<T>(
  path: string,
  data: Record<string, string>,
  check: (body: unknown) => body is T,
): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method: 'post',
    body: new URLSearchParams(data),
  })

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with error: ${response.status}`)
  }

  const body = (await response.json()) as unknown

  if (!check(body)) {
    throw new Error('Received an unexpected response from the server')
  }

  return body
}
