import { TableDefinition } from 'cypress-cucumber-preprocessor'
import { Then, When } from 'cypress-cucumber-preprocessor/steps'

When(/^the user enters:$/, (data: TableDefinition) => {
  for (const [field, value] of data.rows()) {
    const selector = getSelector(field)
    if (value === '') {
      cy.get(selector).clear()
    } else {
      cy.get(selector).clear().type(value)
    }
  }
})

Then(/^the (?<field>total|positive review count|percentage|score) is (?<value>""|.*)$/, (field: string, value: string) => {
  cy.get(getSelector(field))
    .should('have.value', value == '""' ? '' : value)
})

function getSelector(field: string): string {
  switch (field) {
    case 'positive review count':
      return '[data-testid="rating-positive"]'
    default:
      return `[data-testid="rating-${ field }"]`
  }
}
