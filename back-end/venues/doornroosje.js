'use strict'

const fetch = require('node-fetch')
const { AllHtmlEntities } = require('html-entities')

const entities = new AllHtmlEntities()

exports.key = 'doornroosje'
exports.name = 'Doornroosje'
exports.fetch = async (req, res) => {
  try {
    const response = await fetch('https://www.doornroosje.nl/agenda/')

    if (response.status !== 200) {
      res.status(503).json({ reason: `'https://www.doornroosje.nl/agenda/' responded with ${ response.status }` })
      return
    }

    const text = await response.text()
    const matches = text.matchAll(/<script type="?application\/ld\+json"?>(.*?)<\/script>/g)

    const agenda = []
    for (const [, dataStr] of matches) {
      const data = JSON.parse(entities.decode(dataStr.replace('\\r\\n', '\\n')))

      if (data['@type'] === 'Event') {
        data.description = data.description.replace(/^"|"$/g, '')
        data.offers.price = String(data.offers.price)
        agenda.push(data)
      }
    }

    res.status(200).json({ agenda })
  } catch (ex) {
    res.status(500).json({ reason: ex.message })
  }
}
