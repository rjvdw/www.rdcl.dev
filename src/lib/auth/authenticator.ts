import { create, type PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import type { NewAuthenticatorResponse } from '$lib/auth/profileApi'
import { isCredentialCreationOptionsJson } from '$lib/auth/util'
import { InvalidResponse } from '$lib/errors/InvalidResponse'
import { UnauthorizedError } from '$lib/errors/UnauthorizedError'
import { ApiError } from '$lib/errors/ApiError'

export class AddAuthenticator {
  readonly #form: HTMLFormElement

  constructor(form: HTMLFormElement) {
    this.#form = form
  }

  async flow(): Promise<void> {
    const { callback, options } = await this.#start()
    const credential = await create(options)
    await this.#complete(credential, callback)
  }

  async #start(): Promise<NewAuthenticatorResponse> {
    const response = await fetch(this.#form.action, {
      method: this.#form.method,
    })

    if (response.status === 401) {
      throw new UnauthorizedError(response)
    }

    if (!response.ok) {
      console.error(await response.text())
      throw new ApiError(`Request failed with status ${response.status}`, response)
    }

    const responseBody = (await response.json()) as unknown

    if (!isNewAuthenticatorResponse(responseBody)) {
      throw new InvalidResponse(response)
    }

    return responseBody
  }

  async #complete(credential: PublicKeyCredentialWithAttestationJSON, callback: string): Promise<void> {
    await fetch(this.#form.action, {
      method: this.#form.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential, callback }),
    })
  }
}

function isNewAuthenticatorResponse(body: unknown): body is NewAuthenticatorResponse {
  return (
    body !== null &&
    typeof body === 'object' &&
    'callback' in body &&
    typeof body.callback === 'string' &&
    'options' in body &&
    isCredentialCreationOptionsJson(body.options)
  )
}
