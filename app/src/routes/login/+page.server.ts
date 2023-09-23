import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
  async default({ request, cookies }) {
    try {
      const data = await request.formData()
      const response = await login(data)
      cookies.set('session-token', response.sessionToken, {
        path: '/',
        sameSite: 'strict',
      })

      return {
        success: true,
      }
    } catch (err) {
      if (err instanceof LoginError) {
        return fail(400, {
          success: false,
          errors: [`Login failed: ${err.message}`],
        })
      }

      throw err
    }
  },
} satisfies Actions

type LoginResponseBody = {
  sessionToken: string
}

async function login(data: FormData): Promise<LoginResponseBody> {
  const email = data.get('email')
  if (!(typeof email === 'string') || !email) {
    throw new LoginError('invalid email')
  }

  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  })

  if (!response.ok) {
    throw new LoginError(`response not ok: ${response.status}`)
  }

  const body = (await response.json()) as unknown

  if (typeof body === 'object' && body !== null && 'sessionToken' in body && typeof body.sessionToken === 'string') {
    return {
      sessionToken: body.sessionToken,
    }
  }

  throw new LoginError('response did not match the expected format')
}

class LoginError extends Error {
  constructor(message: string) {
    super(message)
  }
}
