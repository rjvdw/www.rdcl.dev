import { type HandlerResponse } from '@netlify/functions'

/**
 * Builds an HTTP Response.
 */
export class ResponseBuilder {
  #status: HandlerResponse['statusCode'] | undefined
  #body: HandlerResponse['body']
  #headers: HandlerResponse['headers']

  /**
   * Sets the status code for the response.
   *
   * @param status
   */
  status(status: number): this {
    this.#status = status
    return this
  }

  /**
   * Sets the raw response body for the response.
   *
   * @param body
   */
  body(body: string): this {
    this.#body = body
    return this
  }

  /**
   * Sets the response body as JSON. Also sets the content-type if not already set.
   *
   * @param body
   */
  json(body: unknown): this {
    this.#body = JSON.stringify(body)
    if (!this.#headers?.['Content-Type']) {
      this.header('Content-Type', 'application/json')
    }
    return this
  }

  /**
   * Sets the headers for the response. Overwrites any headers that may already be set.
   *
   * @param headers
   */
  headers(headers: NonNullable<HandlerResponse['headers']>): this {
    this.#headers = { ...headers }
    return this
  }

  /**
   * Sets a specific header for the response.
   *
   * @param header
   * @param value
   */
  header(header: string, value: boolean | number | string): this {
    if (!this.#headers) {
      this.#headers = {}
    }
    this.#headers[header] = value
    return this
  }

  /**
   * Builds the response.
   */
  build(): HandlerResponse {
    return {
      statusCode: this.#status ?? 200,
      headers: this.#headers,
      body: this.#body,
    }
  }
}
