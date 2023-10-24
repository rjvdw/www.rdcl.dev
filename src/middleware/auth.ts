import { defineMiddleware } from 'astro:middleware'
import { Jwt } from '$lib/auth/Jwt'
import { JwtCookie } from '$lib/auth/cookies'

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
  const jwtCookie = new JwtCookie(cookies)
  const jwtString = jwtCookie.value()

  if (jwtString) {
    const jwt = new Jwt(jwtString)

    if (jwt.expired) {
      jwtCookie.delete()
    } else {
      locals.jwt = jwtString
    }
  }

  return next()
})
