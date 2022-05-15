import { TableDefinition } from 'cypress-cucumber-preprocessor'
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { normalizeHtml } from './util'

Given(/^the current page is (?<path>.+)$/, (path: string) => {
  cy.visit(path)
})

When(/^the user navigates to (?<path>.+)$/, (path: string) => {
  cy.visit(path)
})

When(/^the user refreshes the page$/, () => {
  cy.reload()
})

When(/^the user enters the following:$/, (data: TableDefinition) => {
  for (const [selector, value] of data.rows()) {
    if (value === '') {
      cy.get(selector).clear()
    } else {
      cy.get(selector).clear().type(value)
    }
  }
})

When(/^the user clicks on ["'`](?<selector>.+)["'`]$/, (selector: string) => {
  cy.get(selector).click()
})

Then(/^the page url is ["'`](?<path>.+)["'`]$/, (path: string) => {
  cy.location().its('pathname').should('equal', path)
})

Then(/^the page title is ["'`](?<title>.*)["'`]$/, (title: string) => {
  cy.title().should('equal', title)
})

Then(/^["'`](?<selector>.+)["'`] has value ["'`](?<value>.*)["'`]$/, (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value)
})

Then(/^["'`](?<selector>.+)["'`] has value:$/, (selector: string, value: string) => {
  cy.get(selector)
    .should('have.value', value)
})

Then(/^["'`](?<selector>.+)["'`] matches:$/, (selector: string, body: string) => {
  cy.get(selector)
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(body))
    })
})

Then(/^["'`](?<selector>.+)["'`] matches ["'`](?<body>.*)["'`]$/, (selector: string, body: string) => {
  cy.get(selector)
    .then(($el: JQuery<HTMLElement>) => {
      expect(normalizeHtml($el.html())).to.equal(normalizeHtml(body))
    })
})
