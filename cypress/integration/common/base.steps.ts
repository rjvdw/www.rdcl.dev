import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { TableDefinition } from 'cypress-cucumber-preprocessor'
import { normalizeHtml } from './util'

Given(/^the current page is (.+)$/, (path: string) => {
  cy.visit(path)
})

When(/^the user enters the following:$/, (data: TableDefinition) => {
  for (const [selector, value] of data.rows()) {
    cy.get(selector).type(value)
  }
})

When(/^the user clicks on "(.+)"$/, (selector: string) => {
  cy.get(selector).click()
})

Then(/^"(.*)" has value "(.*)"$/, (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value)
})

Then(/^"(.*)" has value:$/, (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value)
})

Then(/^"(.+)" matches:$/, (selector: string, body: string) => {
  cy.get(selector)
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(body))
    })
})
