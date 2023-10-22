import type { APIRoute } from 'astro'
import { saveSettings, type Settings } from '$lib/health/api'
import { parseDecimal } from '$lib/health/util'
import { UnauthorizedError } from '$lib/errors/UnauthorizedError'

export const POST: APIRoute = async ({
  locals,
  request,
  redirect,
  cookies,
}) => {
  const { jwt } = locals
  if (!jwt) {
    return redirect('/login')
  }

  const referrer = request.headers.get('Referer')
  if (!referrer) {
    return new Response('no referrer specified', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  const data = await request.formData()
  const height = data.get('height')
  if (height && typeof height !== 'string') {
    return new Response('invalid height specified', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  const settings: Settings = {}
  if (height) {
    settings.height = parseDecimal(height)
  }

  try {
    await saveSettings(jwt, settings)
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      cookies.set('jwt', 'deleted', {
        sameSite: 'lax',
        httpOnly: true,
        secure: true,
        path: '/',
        expires: new Date(0),
      })
      return redirect('/login')
    }
    throw err
  }

  return redirect(referrer)
}
