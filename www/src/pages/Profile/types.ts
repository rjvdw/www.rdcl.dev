export type UserProfile = {
  name: string
  email: string
}

export function isUserProfile(body: unknown): body is UserProfile {
  return (
    typeof body === 'object' &&
    body !== null &&
    'name' in body &&
    typeof body.name === 'string' &&
    'email' in body &&
    typeof body.email === 'string'
  )
}
