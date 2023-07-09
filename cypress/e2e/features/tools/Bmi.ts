import {
  DataTable,
  defineParameterType,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor'

defineParameterType({
  name: 'field',
  regexp: /weight|height|bmi/,
  transformer: (s) => s,
})

When('the user enters:', (data: DataTable) => {
  for (const [field, value] of data.rows()) {
    const selector = `[data-testid="${field}"]`
    if (value === '') {
      cy.get(selector).clear()
    } else {
      cy.get(selector).clear().type(value)
    }
  }
})

When('the user enters a bmi of {}', (bmi: string) => {
  cy.get('[data-testid="bmi"]').click()
  cy.get('[data-testid="target-bmi"]').clear().type(bmi)
  cy.get('[data-testid="submit-target-bmi"]').click()
})

Then('{field} has value {string}', (field: string, value: string) => {
  cy.get(`[data-testid="${field}"]`).should(
    'have.value',
    value === '""' ? '' : value,
  )
})
