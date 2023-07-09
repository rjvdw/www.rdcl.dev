import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { ClipboardMock } from '../../../support/step_definitions/mocks/ClipboardMock'
import { CryptoMock } from '../../../support/step_definitions/mocks/CryptoMock'

const cryptoMock = new CryptoMock()
const clipboardMock = new ClipboardMock()

let copiedUuid: number | null = null

Cypress.on('window:before:load', (win) => {
  cryptoMock.reset()
  CryptoMock.apply(cryptoMock, win)
  clipboardMock.reset()
  ClipboardMock.apply(clipboardMock, win)
  copiedUuid = null
})

Given('the user has generated {int} UUIDs', (n: number) => {
  for (let i = 0; i < n; i += 1) {
    cy.get('[data-testid="generate-uuid"]').click()
  }
})

When('the user clicks the button to generate a new UUID', () => {
  cy.get('[data-testid="generate-uuid"]').click()
})

When(
  'the user clicks the button to generate a new UUID {int} times',
  (n: number) => {
    for (let i = 0; i < n; i += 1) {
      cy.get('[data-testid="generate-uuid"]').click()
    }
  },
)

When('the user clicks the button to copy the UUID to their clipboard', () => {
  cy.get('[data-testid="copy-uuid"]').click()
  copiedUuid = -2
})

When(
  'the user clicks the button to generate a new UUID and copy it to their clipboard',
  () => {
    cy.get('[data-testid="generate-and-copy-uuid"]').click()
    copiedUuid = -2
  },
)

When('the user clicks a copy button in the history', () => {
  cy.get('[data-testid="uuid-history"] li:first button').click()
  copiedUuid = -3
})

Then('uuid has no value', () => {
  cy.get('[data-testid="uuid"]').should('have.value', '')
})

Then('uuid has a value', () => {
  cy.get('[data-testid="uuid"]').should(
    'have.value',
    cryptoMock.generatedUuid(copiedUuid || -1),
  )
})

Then('the previously generated UUIDs are now in the history', () => {
  cy.get('[data-testid="uuid-history"] li').should(($items) => {
    const history = cryptoMock.generatedUuids()
    history.length -= 1 // the last item is not in the history
    expect($items).to.have.length(history.length)
    for (let i = 0; i < history.length; i += 1) {
      const actual = $items.eq(i).text().trim()
      const expected = history[history.length - i - 1].trim()

      expect(actual).to.eq(expected)
    }
  })
})

Then('the uuid is copied to the clipboard', () => {
  expect(clipboardMock.readText()).to.equal(
    cryptoMock.generatedUuid(copiedUuid || -1),
  )
})
