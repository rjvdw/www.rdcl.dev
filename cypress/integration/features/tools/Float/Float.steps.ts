import { When } from 'cypress-cucumber-preprocessor/steps'

When(/^the user enters (?<value>.*)$/, (value: string) => {
  cy.get('[data-testid="float-input"]').clear().type(value)
})

When(/^the user chooses (?<precision>single|double) precision$/, (precision: string) => {
  cy.get(`[data-testid="float-type-input-${ precision }"]`).click()
})
