import type { APIRoute } from 'astro'
import { getData } from '$lib/webfinger'

export const GET: APIRoute = async ({ url }) => {
  const resource = url.searchParams.get('resource')
  const relations = url.searchParams.get('rel')

  if (!resource) {
    return new Response(null, {
      status: 400,
    })
  }

  const data = await getData(resource, relations)

  if (!data) {
    return new Response(null, {
      status: 404,
    })
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/jrd+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
