import nuldertien from './venues/013'
import boerderij from './venues/boerderij'
import bosuil from './venues/bosuil'
import doornroosje from './venues/doornroosje'
import patronaat from './venues/patronaat'

export async function handler(event, context) {
  if (event.httpMethod !== 'GET') {
    return respond(405, { reason: 'Method not allowed' })
  }

  const { venue } = event.queryStringParameters
  if (!venue) {
    return respond(200, {
      venues: [
        getVenue(nuldertien),
        getVenue(boerderij),
        getVenue(bosuil),
        getVenue(doornroosje),
        getVenue(patronaat),
      ],
    })
  }

  switch (venue) {
    case nuldertien.key: {
      const { status, data } = await nuldertien.fetch()
      return respond(status, data)
    }
    case boerderij.key: {
      const { status, data } = await boerderij.fetch()
      return respond(status, data)
    }
    case bosuil.key: {
      const { status, data } = await bosuil.fetch()
      return respond(status, data)
    }
    case doornroosje.key: {
      const { status, data } = await doornroosje.fetch()
      return respond(status, data)
    }
    case patronaat.key: {
      const { status, data } = await patronaat.fetch()
      return respond(status, data)
    }
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
