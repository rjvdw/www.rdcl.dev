import {
  CredentialRequestOptionsJSON,
  get,
  PublicKeyCredentialWithAssertionJSON,
} from '@github/webauthn-json'
import { signal } from '@preact/signals'
import { route } from 'preact-router'
import { errorAsString } from '../../util/errors'
import { Api, ApiError, getBody } from '../../util/http'
import { Jwt } from './Jwt'
import {
  isValidLoginResponseBody,
  isValidVerifyResponseBody,
  loggedOutState,
  LoginResponseBody,
} from './types'
import { getInitialState, getLoggedInState } from './util'

export { Jwt }

export const auth = signal(getInitialState())

export async function startLogin(
  api: Api,
  user: string,
  mode?: LoginResponseBody['mode'],
): Promise<{ response: Response; body: LoginResponseBody }> {
  const requestBody = new URLSearchParams()
  requestBody.set('email', user)
  requestBody.set('callback', `${window.location.origin}/login/verify`)
  if (mode) requestBody.set('mode', mode)

  const response = await api.post('/auth/login', requestBody)
  const body = await getBody(response, isValidLoginResponseBody)

  if (mode && body.mode !== mode) {
    // server responded with a different mode than requested
    throw new ApiError(
      'Received invalid authentication mode: ' + body.mode,
      response,
    )
  }

  return { response, body }
}

export async function handleLogin(
  api: Api,
  { mode, payload }: LoginResponseBody,
  loginResponse: Response,
): Promise<boolean> {
  if (mode === 'EMAIL') {
    localStorage.sessionToken = payload
    return true
  }

  const options = parse(payload)
  let credential: PublicKeyCredentialWithAssertionJSON
  try {
    credential = await get(options)
  } catch (err) {
    console.warn(errorAsString(err))
    return false
  }

  const loginCallback = loginResponse.headers.get('Location')
  if (loginCallback === null) {
    throw new ApiError(
      'Missing required response header: Location',
      loginResponse,
    )
  }

  const response = await api.call('post', loginCallback, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credential),
  })

  await handleSuccessfulLogin(response)
  return true
}

export async function completeLogin(verificationCode: string, api: Api) {
  if (!(typeof localStorage.sessionToken === 'string')) {
    throw new Error('No session token available')
  }

  const response = await api.post(
    '/auth/login/verify',
    new URLSearchParams({
      'session-token': localStorage.sessionToken,
      'verification-code': verificationCode,
    }),
  )

  await handleSuccessfulLogin(response)
}

async function handleSuccessfulLogin(response: Response) {
  const body = await getBody(response, isValidVerifyResponseBody)

  const jwt = new Jwt(body.jwt)
  if (!jwt.expired) {
    delete localStorage.sessionToken
    localStorage.jwt = body.jwt
    auth.value = getLoggedInState(jwt)

    route(
      typeof localStorage.redirectAfterLogin === 'string'
        ? localStorage.redirectAfterLogin
        : '/',
      true,
    )
    delete localStorage.redirectAfterLogin
  } else {
    await logout()
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function logout() {
  auth.value = loggedOutState
  delete localStorage.jwt
}

function parse(data: string): CredentialRequestOptionsJSON {
  const parsed = JSON.parse(data) as unknown

  if (isCredentialRequestOptionsJSON(parsed)) {
    return parsed
  }

  throw new Error('Received invalid options')
}

function isCredentialRequestOptionsJSON(
  body: unknown,
): body is CredentialRequestOptionsJSON {
  return (
    typeof body === 'object' &&
    body !== null &&
    'publicKey' in body &&
    isPublicKeyCredentialRequestOptionsJSON(body.publicKey)
  )
}

function isPublicKeyCredentialRequestOptionsJSON(
  body: unknown,
): body is CredentialRequestOptionsJSON['publicKey'] {
  return typeof body === 'object' && body !== null
}
