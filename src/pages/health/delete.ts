import type { APIRoute } from 'astro'
import { deleteRecord } from '$lib/health/api'
import { UnauthorizedError } from '$lib/errors/UnauthorizedError'
import { JwtCookie } from '$lib/auth/cookies'

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

  const jwtCookie = new JwtCookie(cookies)

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
  const date = data.get('date')
  if (typeof date !== 'string') {
    return new Response('no date specified', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  if (!date.match(/^\d+-\d+-\d+$/)) {
    return new Response('invalid date specified', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  try {
    await deleteRecord(jwt, date)
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      jwtCookie.delete()
      return redirect('/login')
    }
    throw err
  }

  return redirect(referrer)
}
