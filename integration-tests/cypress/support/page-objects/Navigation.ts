export const Navigation = {
  get home() {
    return cy.get('.app-nav [href="/"]')
  },

  get tools() {
    return cy.get('.app-nav [href="/tools"]')
  },

  get logout() {
    return cy.get('.app-nav [href="/logout"]')
  },
}
