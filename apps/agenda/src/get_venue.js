import doornroosje from './venues/doornroosje'

export async function handler(event, context) {
  if (event.httpMethod !== 'GET') {
    return respond(405, { reason: 'Method not allowed' })
  }

  const { venue } = event.queryStringParameters
  if (!venue) {
    return respond(200, {
      venues: [
        getVenue(doornroosje),
      ],
    })
  }

  switch (venue) {
    case doornroosje.key:
      const { status, data } = await doornroosje.fetch()
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

function getVenue({ key, name }) {
  return { key, name }
}
