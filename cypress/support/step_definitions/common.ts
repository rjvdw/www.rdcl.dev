import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { normalizeHtml } from './util'

Given('the current page is {}', (path: string) => {
  cy.visit(path)
})

When('the user navigates to {}', (path: string) => {
  cy.visit(path)
})

When('the user refreshes the page', () => {
  cy.reload()
})

When('the user enters the following:', (data: DataTable) => {
  for (const [selector, value] of data.rows()) {
    if (value === '') {
      cy.get(selector).clear()
    } else {
      cy.get(selector).clear().type(value)
    }
  }
})

When('the user clicks on {string}', (selector: string) => {
  cy.get(selector).click()
})

Then('the page url is {string}', (path: string) => {
  cy.location().its('pathname').should('equal', path)
})

Then('the page title is {string}', (title: string) => {
  cy.title().should('equal', title)
})

Then('{string} has value {string}', (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value)
})

Then('{string} has value:', (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value)
})

Then('{string} matches:', (selector: string, body: string) => {
  cy.get(selector)
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(body))
    })
})

Then('{string} matches {string}', (selector: string, body: string) => {
  cy.get(selector)
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(body))
    })
})
