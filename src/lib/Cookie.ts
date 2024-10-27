import { type AstroCookies } from 'astro'
import type { CookieSerializeOptions } from 'cookie'

export class Cookie {
  readonly #cookies: AstroCookies
  readonly #name: string
  readonly #options?: CookieSerializeOptions

  constructor(cookies: AstroCookies, name: string, options?: CookieSerializeOptions) {
    this.#cookies = cookies
    this.#name = name
    if (options) {
      this.#options = options
    }
  }

  value() {
    return this.#cookies.get(this.#name)?.value
  }

  set(value: string, overrides?: Pick<CookieSerializeOptions, 'expires' | 'maxAge'>) {
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
