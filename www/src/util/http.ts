import { useMemo } from 'preact/hooks'

export async function getBody<T>(
  response: Response,
  check: (body: unknown) => body is T,
): Promise<T> {
  const body = (await response.json()) as unknown

  if (!check(body)) {
    throw new ApiError('API call resulted in an unexpected response', response)
  }

  return body
}

export function asParams(form: HTMLFormElement | FormData): URLSearchParams {
  const formData = form instanceof FormData ? form : new FormData(form)
  const params = new URLSearchParams()

  for (const [key, value] of formData) {
    if (typeof value !== 'string') {
      throw new Error(`Could not convert field ${key} to string`)
    }
    params.set(key, value)
  }

  return params
}

export async function callApi(
  method: string,
  path: string,
  authenticated: boolean,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method,
    ...init,
    headers: authenticated
      ? {
          Authorization: `Bearer ${localStorage.jwt}`,
          ...init?.headers,
        }
      : init?.headers,
  })

  if (!response.ok) {
    if (authenticated && response.status === 401) {
      throw new UnauthorizedError(method, path, response)
    }
    throw new ApiCallError(method, path, response)
  }

  return response
}

export function useApi(authenticated: boolean): Api {
  return useMemo(
    () => ({
      async call(method, path, init?) {
        return await callApi(method, path, authenticated, init)
      },

      async callWithBody(method, path, arg1?, arg2?) {
        let init: RequestInit | undefined = undefined
        let body: string | RequestBody | undefined = undefined

        if (arg1) {
          if (
            arg1 instanceof URLSearchParams ||
            arg1 instanceof FormData ||
            typeof arg1 === 'string'
          ) {
            body = arg1
          } else {
            init = arg1
          }
        }

        if (arg2) {
          init = arg2
        }

        return this.call(method, path, {
          body,
          ...init,
        })
      },

      async get(path, init?) {
        return this.call('get', path, init)
      },

      async post(path, body, init?) {
        return this.callWithBody('post', path, body, init)
      },

      async put(path, body, init?) {
        return this.callWithBody('put', path, body, init)
      },

      async patch(path, body, init?) {
        return this.callWithBody('patch', path, body, init)
      },

      async delete(path, init?) {
        return this.call('delete', path, init)
      },
    }),
    [],
  )
}

type RequestBody = URLSearchParams | FormData | string

export interface Api {
  call(method: string, path: string, init?: RequestInit): Promise<Response>
  callWithBody(
    method: string,
    path: string,
    init?: RequestInit,
  ): Promise<Response>
  callWithBody(
    method: string,
    path: string,
    body: RequestBody,
    init?: RequestInit,
  ): Promise<Response>
  get(path: string, init?: RequestInit): Promise<Response>
  post(path: string, body: RequestBody, init?: RequestInit): Promise<Response>
  put(path: string, body: RequestBody, init?: RequestInit): Promise<Response>
  patch(path: string, body: RequestBody, init?: RequestInit): Promise<Response>
  delete(path: string, init?: RequestInit): Promise<Response>
}

export class ApiError extends Error {
  readonly response: Response

  constructor(message: string, response: Response) {
    super(message)
    this.response = response
  }
}

export class ApiCallError extends ApiError {
  readonly method: string
  readonly path: string

  constructor(method: string, path: string, response: Response) {
    super(
      `API call "${method} ${path}" failed with error: ${response.status} ${response.statusText}`,
      response,
    )
    this.method = method
    this.path = path
  }
}

export class UnauthorizedError extends ApiCallError {
  constructor(method: string, path: string, response: Response) {
    super(method, path, response)
  }
}
