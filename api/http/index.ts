import { ResponseBuilder } from './ResponseBuilder'

export { ResponseBuilder }

/**
 * Return a 200 response.
 */
export const ok = () => new ResponseBuilder().status(200)

/**
 * Return a 400 response.
 */
export const badRequest = () => new ResponseBuilder().status(400)

/**
 * Return a 404 response.
 */
export const notFound = () => new ResponseBuilder().status(404)

/**
 * Return a 405 response.
 */
export const methodNotAllowed = () => new ResponseBuilder().status(405)

/**
 * Return a 415 response.
 */
export const unsupportedMediaType = () => new ResponseBuilder().status(415)

/**
 * Return a 502 response.
 */
export const badGateway = () => new ResponseBuilder().status(502)
