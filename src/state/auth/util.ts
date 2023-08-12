import { AuthState, LoggedInAuthState, loggedOutState } from './types.ts'

export function isValid(jwt: unknown): jwt is string {
  return typeof jwt === 'string'
}

export function getInitialState(): AuthState {
  const { jwt } = localStorage
  return isValid(jwt) ? getLoggedInState(jwt) : loggedOutState
}

export function getLoggedInState(jwt: string): LoggedInAuthState {
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
