import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('the current page is {}', (path: string) => {
  cy.visit(path)
})

Then('the page url is {string}', (path: string) => {
  cy.location().its('pathname').should('equal', path)
})

Then('the page title is {string}', (title: string) => {
  cy.title().should('equal', title)
})
