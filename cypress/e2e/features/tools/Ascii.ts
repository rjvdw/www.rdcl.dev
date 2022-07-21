import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

When(/^the user enters "(?<value>.*)"$/, (value: string) => {
  cy.get('[data-testid="ascii-converter-plain-text"]').clear().type(value)
})

When(/^the user chooses to convert to (?<radix>binary|decimal|hex)$/, (radix: string) => {
  cy.get(`[data-testid="ascii-converter-radix-${ parseRadix(radix) }"]`).click()
})

Then(/^the result is "(?<result>.*)"$/, (result: string) => {
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
