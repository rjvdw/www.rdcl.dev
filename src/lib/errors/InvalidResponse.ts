import { ApiError } from './ApiError'

export class InvalidResponse extends ApiError {
  constructor(response: Response) {
    super('received invalid response', response)
  }
}
