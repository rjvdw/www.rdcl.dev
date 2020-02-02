export async function handler(event, context) {
  if (event.httpMethod !== 'GET') {
    return respond(405, { reason: 'Method not allowed' })
  }

  let fetch
  switch (event.path) {
    case 'doornroosje':
      fetch = await import('./venues/doornroosje').fetch
      break
    default:
      return respond(404, { reason: `Path '${ event.path }' not found` })
  }

  const { status, data } = await fetch()
  return respond(status, data)
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
