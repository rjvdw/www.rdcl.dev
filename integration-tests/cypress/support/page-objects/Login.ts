export const Login = {
  get username() {
    return cy.get('[data-testid="login:user"]')
  },

  get form() {
    return cy.get('[data-testid="login:form"]')
  },
}
