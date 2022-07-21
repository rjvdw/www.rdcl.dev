import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { normalizeHtml } from '../../../support/step_definitions/util'

When(/^the user enters (?<value>.*)$/, (value: string) => {
  cy.get('[data-testid="float-input"]').clear().type(value)
})

When(/^the user chooses (?<precision>single|double) precision$/, (precision: string) => {
  cy.get(`[data-testid="float-type-input-${ precision }"]`).click()
})

Then(/^the analysis shows the following:$/, (data: DataTable) => {
  const analysis = parseData(data)
  const expectedHtml = `
  <tbody>
    <tr>
      <th>Input</th>
      <td>${ analysis.input }</td>
    </tr>
    <tr>
      <th>Binary representation</th>
      <td>${ analysis.binary }</td>
    </tr>
    <tr>
      <th>Deconstructed</th>
      <td>
        <span class="sign">${ analysis.sign }</span><span class="exponent">${ analysis.exponent }</span><span class="mantissa">${ analysis.mantissa }</span>
      </td>
    </tr>
    <tr>
      <th>Hex representation</th>
      <td>${ analysis.hex }</td>
    </tr>
    <tr>
      <th>Scientific notation</th>
      <td>${ analysis.scientific.mantissa }×2<sup>${ analysis.scientific.exponent }</sup></td>
    </tr>
    </tbody>
  `

  cy.get('[data-testid="float-analysis"]')
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(expectedHtml))
    })
})

type FloatAnalysis = {
  input: string,
  binary: string,
  sign: string,
  exponent: string,
  mantissa: string,
  hex: string,
  scientific: {
    exponent: string,
    mantissa: string,
  },
}

function parseData(data: DataTable): FloatAnalysis {
  const result: Record<string, string> = {}
  let sn: string = ''
  for (const [field, value] of data.rows()) {
    if (field === 'scientific notation') {
      sn = value
    } else {
      result[field] = value
    }
  }

  return {
    ...result,
    scientific: parseScientificNotation(sn),
  } as FloatAnalysis
}

function parseScientificNotation(sn: string): FloatAnalysis['scientific'] {
  const [mantissa] = sn.split(/\*/, 2)
  const [, exponent] = sn.split(/\^/, 2)

  return { exponent, mantissa }
}
