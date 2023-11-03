import { type AstroCookies } from 'astro'
import { Cookie } from '$lib/Cookie'
import { Jwt } from './Jwt'

export class JwtCookie extends Cookie {
  constructor(cookies: AstroCookies) {
    super(cookies, 'jwt', {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      path: '/',
    })
  }

  override set(value: string) {
    const jwt = new Jwt(value)

    super.set(value, {
      expires: jwt.expires,
    })
  }
}

export class SessionTokenCookie extends Cookie {
  constructor(cookies: AstroCookies) {
    super(cookies, 'session-token', {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      path: '/login',
    })
  }
}

export class RedirectToCookie extends Cookie {
  constructor(cookies: AstroCookies) {
    super(cookies, 'redirect-to', {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      path: '/login',
    })
  }
}

export class RememberMeCookie extends Cookie {
  constructor(cookies: AstroCookies) {
    super(cookies, 'remember-me', {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      path: '/login',
      expires: RememberMeCookie.getExpires(),
    })
  }

  private static getExpires() {
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    return expires
  }
}
