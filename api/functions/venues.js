'use strict'

const { App } = require('../util')

const app = new App('venues')
const venues = {
  '013': require('../venues/013'),
  boerderij: require('../venues/boerderij'),
  bosuil: require('../venues/bosuil'),
  doornroosje: require('../venues/doornroosje'),
  patronaat: require('../venues/patronaat'),
}

app.router.get('/', async (req, res) => {
  res.json({
    venues: Object.values(venues)
      .map(venue => ({
        key: venue.key,
        name: venue.name,
      }))
      .sort((a, b) => a.key.localeCompare(b.key)),
  })
})

app.router.get('/:key', async (req, res) => {
  const { key } = req.params
  const venue = venues[key]

  if (venue) {
    await venue.fetch(req, res)
  } else {
    res.status(404).json({ reason: `Venue '${ key }' not found` })
  }
})

exports.handler = app.getHandler()
