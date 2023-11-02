import {
  type CredentialCreationOptionsJSON,
  type PublicKeyCredentialWithAttestationJSON,
} from '@github/webauthn-json'
import { callAuthenticated } from '$lib/api'
import { ApiError } from '$lib/errors/ApiError'
import { isCredentialCreationOptionsJson } from './util'

type AuthenticatorResponse = {
  id: string
  name?: string | undefined
  lastUsed?: Date | undefined
}

type ProfileResponse = {
  name: string
  email: string
  authenticators: AuthenticatorResponse[]
}

export type NewAuthenticatorResponse = {
  callback: string
  options: CredentialCreationOptionsJSON
}

export async function getProfile(jwt: string): Promise<ProfileResponse> {
  const url = `${import.meta.env.API_URL}/auth/me`
  const response = await callAuthenticated(jwt, url)

  return parseProfileResponse(response)
}

export async function updateProfile(jwt: string, name: string | undefined) {
  const url = `${import.meta.env.API_URL}/auth/me`
  const body = new URLSearchParams()
  if (name) {
    body.set('name', name)
  }
  await callAuthenticated(jwt, url, {
    method: 'patch',
    body,
  })
}

export async function addAuthenticator(
  jwt: string,
): Promise<NewAuthenticatorResponse> {
  const url = `${import.meta.env.API_URL}/auth/authenticator`
  const response = await callAuthenticated(jwt, url, {
    method: 'post',
  })

  const callback = response.headers.get('Location')
  if (!callback) {
    throw new ApiError('Missing required response header: Location', response)
  }

  const options = (await response.json()) as unknown
  if (!isCredentialCreationOptionsJson(options)) {
    throw new ApiError('unexpected response', response)
  }

  return {
    callback,
    options,
  }
}

export async function completeAddingAuthenticator(
  jwt: string,
  callback: string,
  credential: PublicKeyCredentialWithAttestationJSON,
) {
  const url = `${import.meta.env.API_URL}${callback}`
  await callAuthenticated(jwt, url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credential),
  })
}

export async function updateAuthenticator(
  jwt: string,
  id: string,
  name: string | undefined,
) {
  const url = `${import.meta.env.API_URL}/auth/authenticator/${id}`
  const body = new URLSearchParams()
  if (name) {
    body.set('name', name)
  }
  await callAuthenticated(jwt, url, {
    method: 'put',
    body,
  })
}

export async function deleteAuthenticator(jwt: string, id: string) {
  const url = `${import.meta.env.API_URL}/auth/authenticator/${id}`
  await callAuthenticated(jwt, url, {
    method: 'delete',
  })
}

function parseAuthenticatorResponse(
  authenticator: unknown,
): AuthenticatorResponse {
  if (
    authenticator === null ||
    typeof authenticator !== 'object' ||
    !('id' in authenticator) ||
    typeof authenticator.id !== 'string'
  ) {
    throw new Error('received unexpected response')
  }

  const result: AuthenticatorResponse = { id: authenticator.id }

  if ('name' in authenticator && typeof authenticator.name === 'string') {
    result.name = authenticator.name
  }

  if (
    'lastUsed' in authenticator &&
    typeof authenticator.lastUsed === 'string'
  ) {
    result.lastUsed = new Date(Date.parse(authenticator.lastUsed))
  }

  return result
}

async function parseProfileResponse(
  response: Response,
): Promise<ProfileResponse> {
  const body = (await response.json()) as unknown

  if (
    body === null ||
    typeof body !== 'object' ||
    !('name' in body) ||
    typeof body.name !== 'string' ||
    !('email' in body) ||
    typeof body.email !== 'string' ||
    !('authenticators' in body) ||
    !Array.isArray(body.authenticators)
  ) {
    throw new Error('received unexpected response')
  }

  const authenticators = body.authenticators.map((a) =>
    parseAuthenticatorResponse(a),
  )

  authenticators.sort(cmpAuthenticator)

  return {
    name: body.name,
    email: body.email,
    authenticators,
  }
}

function cmpAuthenticator(
  a: AuthenticatorResponse,
  b: AuthenticatorResponse,
): number {
  // most recently used should be sorted to the top
  if (a.lastUsed || b.lastUsed) {
    if (!b.lastUsed) {
      return -1
    }
    if (!a.lastUsed) {
      return 1
    }
    const timeA = a.lastUsed.getTime()
    const timeB = b.lastUsed.getTime()
    if (timeA !== timeB) {
      return timeB - timeA
    }
  }

  // next, sort alphabetically
  if (a.name || b.name) {
    if (!b.name) {
      return 1
    }
    if (!a.name) {
      return -1
    }
    return a.name.localeCompare(b.name)
  }

  // finally sort by ID
  return a.id.localeCompare(b.id)
}
