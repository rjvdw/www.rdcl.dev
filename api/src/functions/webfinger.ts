import { type Handler } from '@netlify/functions'
import { badRequest, notFound, ok } from '../http'
import { getData } from '../webfinger'

export const handler: Handler = async (event) => {
  const resource = event.queryStringParameters?.resource
  const relations = event.multiValueQueryStringParameters?.rel

  if (!resource) {
    return badRequest().build()
  }

  const data = await getData(resource, relations)

  if (!data) {
    return notFound().build()
  }

  return ok()
    .header('Content-Type', 'application/jrd+json')
    .header('Access-Control-Allow-Origin', '*')
    .json(data)
    .build()
}
