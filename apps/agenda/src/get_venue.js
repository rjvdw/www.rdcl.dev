import { fetchAgenda as fetchDoornroosje } from './venues/doornroosje'

export async function handler(event, context) {
  if (event.httpMethod !== 'GET') {
    return respond(405, { reason: 'Method not allowed' })
  }

  const { venue } = event.queryStringParameters
  if (!venue) {
    return respond(400, { reason: "Missing required query string parameter 'venue'" })
  }

  switch (venue) {
    case 'doornroosje':
      const { status, data } = await fetchDoornroosje()
      return respond(status, data)
    default:
      return respond(404, { reason: `Unknown venue '${ venue }'` })
  }
}

function respond(status, data) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}
