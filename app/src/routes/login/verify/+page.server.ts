import type { PageServerLoad } from './$types'
import { Jwt } from '$lib/jwt'

export const load: PageServerLoad = async ({ url, cookies }) => {
  try {
    const sessionToken = cookies.get('session-token') ?? ''
    const verificationCode = url.searchParams.get('verification-code') ?? ''

    const errors: string[] = []
    if (!sessionToken) errors.push('no session token')
    if (!verificationCode) errors.push('no verification code')

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      }
    }

    const response = await verify(sessionToken, verificationCode)

    const jwt = new Jwt(response.jwt)
    cookies.set('jwt', response.jwt, {
      path: '/',
      sameSite: 'strict',
      expires: jwt.expires,
    })

    cookies.set('session-token', '', {
      path: '/',
      sameSite: 'strict',
      expires: new Date(0),
    })

    return {
      success: true,
    }
  } catch (err) {
    if (err instanceof VerifyError) {
      return {
        success: false,
        errors: [err.message],
      }
    }

    throw err
  }
}

type VerifyResponseBody = {
  jwt: string
}

async function verify(sessionToken: string, verificationCode: string): Promise<VerifyResponseBody> {
  const response = await fetch('http://localhost:8080/auth/login/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionToken,
      verificationCode,
    }),
  })

  if (!response.ok) {
    throw new VerifyError(`response not ok: ${response.status}`)
  }

  const body = (await response.json()) as unknown

  if (typeof body === 'object' && body !== null && 'jwt' in body && typeof body.jwt === 'string') {
    return {
      jwt: body.jwt,
    }
  }

  throw new VerifyError('response did not match the expected format')
}

class VerifyError extends Error {
  constructor(message: string) {
    super(message)
  }
}
