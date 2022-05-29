import { TableDefinition } from 'cypress-cucumber-preprocessor'
import { Then, When } from 'cypress-cucumber-preprocessor/steps'

When(/^the user enters:$/, (data: TableDefinition) => {
  for (const [field, value] of data.rows()) {
    const selector = `[data-testid="${ field }"]`
    if (value === '') {
      cy.get(selector).clear()
    } else {
      cy.get(selector).clear().type(value)
    }
  }
})

Then(/^(?<field>weight|height|bmi) has value (?<value>""|.*)$/, (field: string, value: string) => {
  cy.get(`[data-testid="${ field }"]`)
    .should('have.value', value == '""' ? '' : value)
})
