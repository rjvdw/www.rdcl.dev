import type { Handle, RequestEvent } from '@sveltejs/kit'
import { Jwt } from '$lib/jwt'

export const handle: Handle = async ({ event, resolve }) => {
  checkJwt(event)

  return resolve(event)
}

function checkJwt(event: RequestEvent) {
  const jwtCookie = event.cookies.get('jwt')
  if (jwtCookie) {
    const jwt = new Jwt(jwtCookie)
    if (jwt.expired) {
      event.cookies.delete('jwt', {
        path: '/',
        sameSite: 'strict',
      })
    } else {
      event.locals.jwt = jwt
    }
  }
}
