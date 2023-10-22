import { ApiError } from './ApiError'

export class UnauthorizedError extends ApiError {
  constructor(response: Response) {
    super('not authorized', response)
  }
}
