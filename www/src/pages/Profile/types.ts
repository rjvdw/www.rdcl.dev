export type Authenticator = {
  id: string
  name?: string
}

export type UserProfile = {
  name: string
  email: string
  authenticators: Authenticator[]
}

export function isUserProfile(this: void, body: unknown): body is UserProfile {
  return (
    typeof body === 'object' &&
    body !== null &&
    'name' in body &&
    typeof body.name === 'string' &&
    'email' in body &&
    typeof body.email === 'string' &&
    'authenticators' in body &&
    Array.isArray(body.authenticators) &&
    body.authenticators.every(isAuthenticator)
  )
}

function isAuthenticator(this: void, body: unknown): body is Authenticator {
  return (
    typeof body === 'object' &&
    body !== null &&
    'id' in body &&
    typeof body.id === 'string' &&
    (!('name' in body) || typeof body.name === 'string')
  )
}
