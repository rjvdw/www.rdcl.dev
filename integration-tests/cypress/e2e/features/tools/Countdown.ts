import {
  DataTable,
  defineParameterType,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor'
import { normalizeHtml } from '../../../support/step-definitions/util'

defineParameterType({
  name: 'numbers',
  regexp: /\d+(?:\D+\d+)*/,
  transformer: (numbers) =>
    numbers.split(/\D+/g).map((number) => parseInt(number)),
})

When('the user enters the numbers {numbers}', (numbers: number[]) => {
  for (let i = 0; i < 6; i += 1) {
    cy.get(`[data-testid="cd-inp-numbers.${i}"]`)
      .clear()
      .type(String(numbers[i]))
  }
})

When('the user enters a target of {int}', (target: number) => {
  cy.get('[data-testid="cd-inp-target"]').clear().type(String(target))
})

When('the user tries to find a solution', () => {
  cy.get('main > form button').click()
})

Then('no solution is shown', () => {
  cy.get('[data-testid="cd-solution"]').should('not.exist')
})

Then('the following solution is found:', (data: DataTable) => {
  const expectedHtml = `
    <h2>Solution</h2>
    <ul>
      ${data
        .rows()
        .map(
          ([operation, op1, op2, result]) => `
        <li>${op1} ${operation} ${op2} = ${result}</li>
      `,
        )
        .join('')}
    </ul>
  `

  cy.get('[data-testid="cd-solution"]').then(($el: JQuery<HTMLElement>) => {
    expect(normalizeHtml($el.html())).to.equal(normalizeHtml(expectedHtml))
  })
})

Then('no solution is found', () => {
  cy.get('[data-testid="cd-solution"]').then(($el: JQuery<HTMLElement>) => {
    expect(normalizeHtml($el.html())).to.equal(
      normalizeHtml(`
        <h2>Solution</h2>
        <p>This one is not possible</p>
      `),
    )
  })
})
