import { DataTable, defineParameterType, Then, When } from '@badeball/cypress-cucumber-preprocessor'

defineParameterType({
  name: 'field',
  regexp: /drop rate|nr attempts|chance|95th percentile|99th percentile/,
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
    .should('have.value', value == '""' ? '' : value)
})

function getSelector(field: string): string {
  switch (field) {
    case 'drop rate':
      return '[data-testid="dropRate"]'
    case 'nr attempts':
      return '[data-testid="nrAttempts"]'
    case 'chance':
      return '[data-testid="chance"]'
    case '95th percentile':
      return '[data-testid="perc95"]'
    case '99th percentile':
      return '[data-testid="perc99"]'
    default:
      throw new Error(`Invalid field: ${ field }`)
  }
}
