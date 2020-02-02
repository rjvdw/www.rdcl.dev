import fetch from 'node-fetch'
import { AllHtmlEntities } from 'html-entities'
import { fail, success } from '../util'

const entities = new AllHtmlEntities()

export default {
  key: 'doornroosje',
  name: 'Doornroosje',
  async fetch() {
    try {
      const response = await fetch('https://www.doornroosje.nl/agenda/')

      if (response.status !== 200) {
        return fail(503, `'https://www.doornroosje.nl/agenda/' responded with ${ response.status }`)
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

      return success({ agenda })
    } catch (ex) {
      return fail(500, ex.message)
    }
  },
}
