import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { TableDefinition } from 'cypress-cucumber-preprocessor'
import { minifyHtml } from './util'

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

Then(/^"(.+)" matches:$/, (selector: string, body: string) => {
  cy.get(selector)
    .then(($el: JQuery<HTMLElement>) => {
      expect($el.html()).to.equal(minifyHtml(body))
    })
})
