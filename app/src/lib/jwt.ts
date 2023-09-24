import jwtDecode, { type JwtPayload } from 'jwt-decode'

interface Payload extends JwtPayload {
  sub: Required<JwtPayload>['sub']
  exp: Required<JwtPayload>['exp']
  preferred_username: string
}

export class Jwt {
  readonly #payload: Payload

  constructor(jwt: string) {
    this.#payload = jwtDecode(jwt)
  }

  get email() {
    return this.#payload.sub
  }

  get displayName() {
    return this.#payload.preferred_username
  }

  get expires() {
    return new Date(this.#payload.exp * 1000)
  }

  get expired() {
    return Date.now() > this.#payload.exp * 1000
  }
}
