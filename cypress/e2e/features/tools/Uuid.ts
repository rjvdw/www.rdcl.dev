import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { ClipboardMock } from '../../../support/step_definitions/mocks/ClipboardMock'
import { CryptoMock } from '../../../support/step_definitions/mocks/CryptoMock'

const cryptoMock = new CryptoMock()
const clipboardMock = new ClipboardMock()

Cypress.on('window:before:load', (win) => {
  CryptoMock.apply(cryptoMock, win)
  ClipboardMock.apply(clipboardMock, win)
})

When('the user clicks the button to generate a new UUID', () => {
  cy.get('[data-testid="generate-uuid"]').click()
})

When('the user clicks the button to copy the UUID to their clipboard', () => {
  cy.get('[data-testid="copy-uuid"]').click()
})

When('the user clicks the button to generate a new UUID and copy it to their clipboard', () => {
  cy.get('[data-testid="generate-and-copy-uuid"]').click()
})

Then('uuid has no value', () => {
  cy.get('[data-testid="uuid"]')
    .should('have.value', '')
})

Then('uuid has a value', () => {
  cy.get('[data-testid="uuid"]')
    .should('have.value', cryptoMock.lastUuid())
})

Then('the uuid is copied to the clipboard', () => {
  expect(clipboardMock.readText()).to.equal(cryptoMock.lastUuid())
})
