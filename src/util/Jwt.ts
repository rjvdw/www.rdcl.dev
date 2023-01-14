import jwtDecode from 'jwt-decode'

export class Jwt {
  private readonly jwt: {
    sub: string
    exp: number
    preferred_username: string
  }

  constructor(jwt: string) {
    this.jwt = jwtDecode(jwt)
  }

  get id() {
    return this.jwt.sub
  }

  get username() {
    return this.jwt.preferred_username
  }

  isExpired() {
    return this.jwt.exp === undefined
      ? false
      : Date.now() > this.jwt.exp * 1000
  }

  get raw(): string {
    return JSON.parse(JSON.stringify(this.jwt))
  }
}
