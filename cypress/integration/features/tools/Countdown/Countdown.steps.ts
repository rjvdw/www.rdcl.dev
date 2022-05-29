import { TableDefinition } from 'cypress-cucumber-preprocessor'
import { Then, When } from 'cypress-cucumber-preprocessor/steps'
import { normalizeHtml } from '../../../common/util'

When(/^the user enters the numbers (?<numbers>.*)$/, (numbers: string) => {
  const nrs = numbers.split(/\D+/g)
  for (let i = 0; i < 6; i += 1) {
    cy.get(`[data-testid="cd-inp-${ i + 1 }"]`)
      .clear()
      .type(nrs[i])
  }
})

When(/^the user enters a target of (?<target>.*)$/, (target: string) => {
  cy.get('[data-testid="cd-inp-target"]').clear().type(target)
})

When(/^the user tries to find a solution$/, () => {
  cy.get('main > form button').click()
})

Then(/^the following solution is found:$/, (data: TableDefinition) => {
  const expectedHtml = `
    <h2>Solution</h2>
    <ul>
      ${ data.rows().map(([operation, op1, op2, result]) => `
        <li>${ op1 } ${ operation } ${ op2 } = ${ result }</li>
      `).join('') }
    </ul>
  `

  cy.get('[data-testid="cd-solution"]')
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(expectedHtml))
    })
})

Then(/^no solution is found$/, () => {
  cy.get('[data-testid="cd-solution"]')
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(`
        <h2>Solution</h2>
        <p>This one is not possible</p>
      `))
    })
})
