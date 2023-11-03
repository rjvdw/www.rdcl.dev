import type { APIRoute } from 'astro'
import type { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import {
  addAuthenticator,
  completeAddingAuthenticator,
} from '$lib/auth/profileApi'
import { UnauthorizedError } from '$lib/errors/UnauthorizedError'
import { unauthorized } from '$lib/responses'

type CompleteRequest = {
  credential: PublicKeyCredentialWithAttestationJSON
  callback: string
}

export const POST: APIRoute = async ({ locals, request }) => {
  const { jwt } = locals
  if (!jwt) {
    return unauthorized()
  }

  try {
    const data = await readRequestBody(request)

    if (data) {
      await completeAddingAuthenticator(jwt, data.callback, data.credential)

      return new Response(null, {
        status: 204,
      })
    } else {
      const response = await addAuthenticator(jwt)

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return unauthorized()
    }

    return new Response('error from upstream server', {
      status: 502,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}

async function readRequestBody(
  request: Request,
): Promise<CompleteRequest | null> {
  try {
    const data = (await request.json()) as unknown

    if (isCompleteRequest(data)) {
      return data
    }
  } catch (err) {
    //
  }

  return null
}

function isCompleteRequest(data: unknown): data is CompleteRequest {
  return (
    data !== null &&
    typeof data === 'object' &&
    'callback' in data &&
    typeof data.callback === 'string' &&
    'credential' in data
  )
}
