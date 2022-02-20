import { Then } from 'cypress-cucumber-preprocessor/steps'
import { TableDefinition } from 'cypress-cucumber-preprocessor'

Then(/^the following tools are present:$/, (data: TableDefinition) => {
  for (const [tool, url, description] of data.rows()) {
    cy.get('main rdcl-tool-link')
      .filter(function (this: HTMLElement) {
        return this.innerHTML.indexOf(tool) !== -1
      })
      .should('contain', description)
      .find('a')
      .should('have.attr', 'href')
      .should('equal', url)
  }
})
