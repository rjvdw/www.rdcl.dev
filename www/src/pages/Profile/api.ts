import { create, CredentialCreationOptionsJSON } from '@github/webauthn-json'
import { ApiError, getBody, useApi } from '../../util/http'
import { Authenticator } from './types'

export function useAuthenticatorApi() {
  const api = useApi(true)

  return {
    async add() {
      const registerResponse = await api.call('post', '/auth/authenticator')

      const registrationCallback = registerResponse.headers.get('Location')
      if (registrationCallback === null) {
        throw new ApiError(
          'Missing required response header: Location',
          registerResponse,
        )
      }

      const options = await getBody(
        registerResponse,
        isCredentialCreationOptionsJson,
      )
      const credential = await create(options)

      await api.call('post', registrationCallback, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      })
    },

    async update(authenticator: Authenticator) {
      const name = prompt('Enter a new name for this authenticator')

      if (name === null) {
        // user pressed cancel, not updating
        return
      }

      const body = new URLSearchParams()
      if (name) {
        body.set('name', name)
      }

      await api.put(`/auth/authenticator/${authenticator.id}`, body)
    },

    async delete(authenticator: Authenticator) {
      await api.delete(`/auth/authenticator/${authenticator.id}`)
    },
  }
}

function isCredentialCreationOptionsJson(
  body: unknown,
): body is CredentialCreationOptionsJSON {
  return (
    typeof body === 'object' &&
    body !== null &&
    'publicKey' in body &&
    isPublicKeyCredentialCreationOptionsJSON(body.publicKey)
  )
}

function isPublicKeyCredentialCreationOptionsJSON(
  body: unknown,
): body is CredentialCreationOptionsJSON['publicKey'] {
  return typeof body === 'object' && body !== null
}
