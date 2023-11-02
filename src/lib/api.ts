import { ApiError } from './errors/ApiError'
import { UnauthorizedError } from './errors/UnauthorizedError'

export async function call(
  ...[input, init]: Parameters<typeof fetch>
): Promise<Response> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new ApiError(
      `Request to "${input.toString()}" failed with status ${response.status}`,
      response,
    )
  }

  return response
}

export async function callAuthenticated(
  jwt: string,
  ...[input, init]: Parameters<typeof fetch>
): Promise<Response> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${jwt}`,
      ...init?.headers,
    },
  })

  if (response.status === 401) {
    throw new UnauthorizedError(response)
  }

  if (!response.ok) {
    throw new ApiError(
      `Request to "${input.toString()}" failed with status ${response.status}`,
      response,
    )
  }

  return response
}
