import fetch from 'node-fetch'
import { fail, success } from '../util'

export async function fetchAgenda() {
  try {
    const response = await fetch('https://www.doornroosje.nl/agenda/')

    if (response.status !== 200) {
      return fail(503, `'https://www.doornroosje.nl/agenda/' responded with ${ response.status }`)
    }

    const text = await response.text()
    const matches = text.matchAll(/<script type="?application\/ld\+json"?>(.*?)<\/script>/g)

    const agenda = []
    for (const [, data] of matches) {
      agenda.push(JSON.parse(data))
    }

    return success({ agenda })
  } catch (ex) {
    return fail(500, ex.message)
  }
}
