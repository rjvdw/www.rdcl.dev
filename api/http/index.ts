import { ResponseBuilder } from './ResponseBuilder'

export { ResponseBuilder }

/**
 * Return a 200 response.
 */
export const ok = () => new ResponseBuilder()
  .status(200)

/**
 * Return a 400 response.
 */
export const badRequest = () => new ResponseBuilder()
  .status(400)

/**
 * Return a 404 response.
 */
export const notFound = () => new ResponseBuilder()
  .status(404)
