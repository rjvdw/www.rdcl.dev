import axios from 'axios'
import { JSDOM } from 'jsdom'
import { fail, success } from '../util'

export async function fetch() {
  try {
    const { data } = await axios('https://www.doornroosje.nl/agenda/')
    const dom = new JSDOM(data)
    const agendaElement = dom.window.document.querySelector('#agenda > .items.list')

    if (!agendaElement) {
      return fail(500, 'Could not find "#agenda > .items.list"')
    }

    const agenda = []
    for (const item of agendaElement.children) {
      const ldScriptElement = item.querySelector('script[type="application/ld+json"]')

      if (!ldScriptElement) {
        console.warn(`Item '<${ item.tagName.toLowerCase() } data-id="${ item.dataset.id }"/>' does not seem to contain linked data`)
        continue
      }

      agenda.push(JSON.parse(ldScriptElement.innerHTML.replace(/\\r\\n/g, '\\n')))
    }

    return success({ agenda })
  } catch (ex) {
    return fail(500, ex.message)
  }
}
