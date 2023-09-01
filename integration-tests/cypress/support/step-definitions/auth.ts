import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { Login } from '../page-objects/Login'
import { Navigation } from '../page-objects/Navigation'
import { generateCredential, mockCredentialsContainer } from './util/auth'

type TestState = Partial<{
  mode: 'email' | 'passkey'
  resolveAuthenticator(this: void): void
  rejectAuthenticator(this: void): void
}>

let WORLD: TestState = {}

beforeEach(() => {
  WORLD = {}
})

Given('a user with e-mail authentication', () => {
  WORLD.mode = 'email'
  cy.intercept('POST', `${Cypress.env('API_URL')}/auth/login`, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    fixture: 'auth/start-login-email-success.json',
  })
})

Given('a user that previously started e-mail authentication', () => {
  WORLD.mode = 'email'
  cy.setLocalStorage('sessionToken', 'st-abc123')
  cy.intercept('POST', `${Cypress.env('API_URL')}/auth/login/verify`, {
    statusCode: 200,
    fixture: 'auth/login-success.json',
  })
})

Given('a user with passkey authentication', () => {
  WORLD.mode = 'passkey'
  const callback = '/auth/login/ABC123/complete'

  cy.visit('/login', {
    onBeforeLoad(win) {
      mockCredentialsContainer(win.navigator, {
        get: cy.stub().returns(
          new Promise((resolve, reject) => {
            WORLD.resolveAuthenticator = () => resolve(generateCredential())
            WORLD.rejectAuthenticator = () =>
              reject(new DOMException('log in aborted'))
          }),
        ),
      })
    },
  })

  cy.intercept('POST', `${Cypress.env('API_URL')}/auth/login`, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      Location: callback,
    },
    fixture: 'auth/start-login-passkey-success.json',
  })

  cy.intercept('POST', `${Cypress.env('API_URL')}${callback}`, {
    statusCode: 200,
    fixture: 'auth/login-success.json',
  })
})

When('the user logs in', () => {
  Login.username.type('valid-user@example.com')
  Login.form.submit()
})

When('the user logs in with a valid passkey', () => {
  Login.username.type('valid-user@example.com')
  Login.form.submit()
})

When('the user finishes logging in', () => {
  if (WORLD.mode === 'email') {
    cy.visit('/login/verify?verification-code=vc-abc123')
  }

  if (WORLD.mode === 'passkey') {
    WORLD.resolveAuthenticator?.()
  }
})

When('the user does not finish logging in', () => {
  if (WORLD.mode === 'passkey') {
    WORLD.rejectAuthenticator?.()
  }
})

Then('the user is logged in', () => {
  Navigation.logout.should('exist')
})

Then('the user is not logged in', () => {
  Navigation.logout.should('not.exist')
})
