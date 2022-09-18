import { DataTable, defineParameterType, Then, When } from '@badeball/cypress-cucumber-preprocessor'

defineParameterType({
  name: 'field',
  regexp: /total|positive review count|percentage|score/,
  transformer: getSelector,
})

When('the user enters:', (data: DataTable) => {
  for (const [field, value] of data.rows()) {
    const selector = getSelector(field)
    if (value === '') {
      cy.get(selector).clear()
    } else {
      cy.get(selector).clear().type(value)
    }
  }
})

Then('the {field} is {string}', (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value === '""' ? '' : value)
})

function getSelector(field: string): string {
  switch (field) {
    case 'positive review count':
      return '[data-testid="rating-positive"]'
    default:
      return `[data-testid="rating-${ field }"]`
  }
}
