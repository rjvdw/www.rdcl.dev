import jwtDecode from 'jwt-decode'

export class Jwt {
  readonly #jwt: {
    sub: string
    exp: number
    preferred_username: string
  }

  constructor(jwt: string) {
    this.#jwt = jwtDecode(jwt)
  }

  get id() {
    return this.#jwt.sub
  }

  get username() {
    return this.#jwt.preferred_username
  }

  get expires() {
    return new Date(this.#jwt.exp * 1000)
  }

  get expired() {
    return Date.now() > this.#jwt.exp * 1000
  }

  get raw(): Record<string, unknown> {
    return JSON.parse(JSON.stringify(this.#jwt)) as Record<string, unknown>
  }
}
