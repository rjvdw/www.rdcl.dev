const fetch = require('node-fetch')

const LOCATION = {
  '@type': 'Place',
  name: '013 Poppodium Tilburg',
  address: 'Veemarktstraat 44, 5038 CV Tilburg',
}

exports.key = '013'
exports.name = '013 Poppodium tilburg'
exports.fetch = async (req, res) => {
  try {
    const response = await fetch('https://www.013.nl/programma')

    if (response.status !== 200) {
      res.status(503).json({ reason: `'https://www.013.nl/programma' responded with ${ response.status }` })
      return
    }

    const events = parseEvents(await response.text())
    const agenda = events.map(event => ({
      '@context': 'http://schema.org',
      '@type': 'Event',
      name: `${ event.title } ${ event.supportAct || '' }`.trim(),
      url: `https://www.013.nl${ event.url }`,
      startDate: event.dates.startsAt,
      endDate: event.dates.endsAt,
      description: event.subtitle || '',
      location: LOCATION,
      offers: {
        '@type': 'Offer',
        url: `https://www.013.nl${ event.url }`,
        availability: getAvailability(event.flags),
      },
    }))

    res.status(200).json({ agenda })
  } catch (ex) {
    res.status(500).json({ reason: ex.message })
  }
}

function parseEvents(text) {
  const match = text.match(/<script>[\s\S]*?__bridge.*=([\s\S]*?)<\/script>/m)

  if (match) {
    const [, blob] = match
    const relevant = getRelevantPart(blob, 'event_index:', ',\n')
    return JSON.parse(relevant).events
  } else {
    throw new Error('Failed to process event data from 013 😔')
  }
}

function getRelevantPart(blob, start, end) {
  const startIdx = blob.indexOf(start) + start.length
  const endIdx = blob.indexOf(end, startIdx)

  return blob.substring(startIdx, endIdx).trim()
}

function getAvailability(flags) {
  if (flags.soldOut) return 'http://schema.org/SoldOut'
  if (flags.cancelled) return 'http://schema.org/Discontinued'
  return 'http://schema.org/InStock'
}
