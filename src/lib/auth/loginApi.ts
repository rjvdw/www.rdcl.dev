import type { CredentialRequestOptionsJSON } from '@github/webauthn-json'
import { isCredentialRequestOptionsJSON } from './util'
import { call } from '$lib/api'
import { ApiError } from '$lib/errors/ApiError'
import { InvalidResponse } from '$lib/errors/InvalidResponse'

type EmailLoginResponse = {
  mode: 'EMAIL'
  sessionToken: string
}

type AuthenticatorLoginResponse = {
  mode: 'AUTHENTICATOR'
  options: CredentialRequestOptionsJSON
  logInId: string
}

type LoginResponse = EmailLoginResponse | AuthenticatorLoginResponse

export async function login(requestBody: URLSearchParams): Promise<LoginResponse> {
  const url = `${import.meta.env.API_URL}/auth/login`
  const response = await call(url, {
    method: 'post',
    body: requestBody,
  })

  return parseLoginResponse(response)
}

async function parseLoginResponse(response: Response): Promise<LoginResponse> {
  const body = (await response.json()) as unknown

  if (
    body === null ||
    typeof body !== 'object' ||
    !('mode' in body) ||
    !('payload' in body) ||
    typeof body.payload !== 'string'
  ) {
    throw new InvalidResponse(response)
  }

  if (body.mode === 'EMAIL') {
    return {
      mode: 'EMAIL',
      sessionToken: body.payload,
    }
  }

  if (body.mode === 'AUTHENTICATOR') {
    const location = response.headers.get('Location')
    const options = JSON.parse(body.payload) as unknown

    if (!location || !isCredentialRequestOptionsJSON(options)) {
      throw new InvalidResponse(response)
    }

    const match = location.match(/^\/auth\/login\/(.*)\/complete$/)
    if (!match) {
      throw new InvalidResponse(response)
    }

    return {
      mode: 'AUTHENTICATOR',
      options,
      logInId: match[1]!,
    }
  }

  throw new ApiError('unsupported login mode: ' + body.mode, response)
}

type VerifyResponse = {
  jwt: string
}

export async function verify(verificationCode: string, sessionToken: string): Promise<VerifyResponse> {
  const requestBody = new URLSearchParams()
  requestBody.set('verification-code', verificationCode)
  requestBody.set('session-token', sessionToken)

  const url = `${import.meta.env.API_URL}/auth/login/verify`
  const response = await call(url, {
    method: 'post',
    body: requestBody,
  })

  const body = (await response.json()) as unknown

  if (!isVerifyResponse(body)) {
    throw new InvalidResponse(response)
  }

  return body
}

export async function verifyCredential(logInId: string, credential: string): Promise<VerifyResponse> {
  const url = `${import.meta.env.API_URL}/auth/login/${logInId}/complete`
  const response = await call(url, {
    method: 'post',
    body: credential,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const body = (await response.json()) as unknown

  if (!isVerifyResponse(body)) {
    throw new InvalidResponse(response)
  }

  return body
}

function isVerifyResponse(body: unknown): body is VerifyResponse {
  return body !== null && typeof body === 'object' && 'jwt' in body && typeof body.jwt === 'string'
}
