import { defineParameterType, Then, When } from '@badeball/cypress-cucumber-preprocessor'

defineParameterType({
  name: 'radix',
  regexp: /binary|decimal|hex/,
  transformer: parseRadix,
})

When('the user enters {string}', (value: string) => {
  cy.get('[data-testid="ascii-converter-plain-text"]').clear().type(value)
})

When('the user chooses to convert to {radix}', (radix: 2|10|16) => {
  cy.get(`[data-testid="ascii-converter-radix-${ radix }"]`).click()
})

Then('the result is {string}', (result: string) => {
  cy.get('[data-testid="ascii-converter-ascii"]')
    .should('have.value', result)
})

function parseRadix(radix: string): 2 | 10 | 16 {
  switch (radix) {
    case 'binary':
      return 2
    case 'decimal':
      return 10
    case 'hex':
      return 16
    default:
      throw new Error(`Invalid radix: ${ radix }`)
  }
}
