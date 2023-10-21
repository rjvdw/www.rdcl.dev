import { defineMiddleware } from 'astro:middleware'
import { Jwt } from '$lib/auth/Jwt'

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
  const jwtString = cookies.get('jwt')?.value

  if (jwtString) {
    const jwt = new Jwt(jwtString)

    if (jwt.expired) {
      cookies.set('jwt', 'deleted', {
        sameSite: 'lax',
        httpOnly: true,
        secure: true,
        path: '/',
        expires: new Date(0),
      })
    } else {
      locals.jwt = jwtString
    }
  }

  return next()
})
