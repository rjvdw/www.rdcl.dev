import { type AstroCookies } from 'astro'

type Options = {
  domain?: string
  expires?: Date
  httpOnly?: boolean
  maxAge?: number
  path?: string
  sameSite?: boolean | 'lax' | 'none' | 'strict'
  secure?: boolean
}

type OptionOverrides = Pick<Options, 'expires' | 'maxAge'>

export class Cookie {
  readonly #cookies: AstroCookies
  readonly #name: string
  readonly #options?: Options

  constructor(cookies: AstroCookies, name: string, options?: Options) {
    this.#cookies = cookies
    this.#name = name
    if (options) {
      this.#options = options
    }
  }

  value() {
    return this.#cookies.get(this.#name)?.value
  }

  set(value: string, overrides?: OptionOverrides) {
    const options = overrides
      ? {
          ...this.#options,
          ...overrides,
        }
      : this.#options

    this.#cookies.set(this.#name, value, options)
  }

  delete() {
    this.#cookies.delete(this.#name, this.#options)
  }
}
