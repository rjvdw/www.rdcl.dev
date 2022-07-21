import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor'

Then(/^the following tools are present:$/, (data: DataTable) => {
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
