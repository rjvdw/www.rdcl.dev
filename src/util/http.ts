import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { unauthorized } from '../slices/auth'
import { StoreDispatch } from '../store'

async function callApi(
  method: string,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method,
    ...init,
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new UnauthorizedError(method, path, response)
    }
    throw new ApiCallError(method, path, response)
  }

  return response
}

export const api = Object.assign(callApi, {
  get: (path: string, init?: RequestInit) => callApi('get', path, init),
  post: (path: string, init?: RequestInit) => callApi('post', path, init),
  put: (path: string, init?: RequestInit) => callApi('put', path, init),
  delete: (path: string, init?: RequestInit) => callApi('delete', path, init),
})

export function useApi() {
  const dispatch = useDispatch<StoreDispatch>()

  return useMemo(
    () => ({
      async call(
        method: string,
        path: string,
        init?: RequestInit,
      ): Promise<Response> {
        try {
          return await callApi(method, path, init)
        } catch (err) {
          if (err instanceof UnauthorizedError) {
            dispatch(unauthorized())
          }

          throw err
        }
      },

      async get(path: string, init?: RequestInit): Promise<Response> {
        return this.call('get', path, init)
      },

      async post(
        path: string,
        data: Parameters<typeof getRequestInitWithBody>[0],
        contentType: Parameters<typeof getRequestInitWithBody>[1],
        init?: RequestInit,
      ): Promise<Response> {
        return this.call(
          'post',
          path,
          merge(getRequestInitWithBody(data, contentType), init),
        )
      },

      async put(
        path: string,
        data: Parameters<typeof getRequestInitWithBody>[0],
        contentType: Parameters<typeof getRequestInitWithBody>[1],
        init?: RequestInit,
      ): Promise<Response> {
        return this.call(
          'put',
          path,
          merge(getRequestInitWithBody(data, contentType), init),
        )
      },

      async delete(path: string, init?: RequestInit): Promise<Response> {
        return this.call('delete', path, init)
      },
    }),
    [dispatch],
  )
}

function getFormEncodedBody(data: Record<string, unknown>): string {
  const encoded = new URLSearchParams()
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      for (const v of value) {
        encoded.append(key, String(v))
      }
    } else {
      encoded.set(key, String(value))
    }
  })
  return encoded.toString()
}

function getRequestInitWithBody(
  data: string | Record<string, unknown>,
  contentType: 'form' | 'json',
): RequestInit {
  if (contentType === 'form') {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: typeof data === 'string' ? data : getFormEncodedBody(data),
    }
  }

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: typeof data === 'string' ? data : JSON.stringify(data),
  }
}

function merge(init1: RequestInit, init2?: RequestInit): RequestInit {
  return {
    ...init1,
    ...init2,
    headers: {
      ...init1.headers,
      ...init2?.headers,
    },
  }
}

export class ApiCallError extends Error {
  readonly method: string
  readonly path: string
  readonly response: Response

  constructor(method: string, path: string, response: Response) {
    super(
      `API call "${method} ${path}" failed with error: ${response.status} ${response.statusText}`,
    )
    this.method = method
    this.path = path
    this.response = response
  }
}

export class UnauthorizedError extends ApiCallError {
  constructor(method: string, path: string, response: Response) {
    super(method, path, response)
  }
}
