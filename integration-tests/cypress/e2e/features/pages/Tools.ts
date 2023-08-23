import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor'
import { Tools } from '../../../support/page-objects/Tools'

Then('the following tools are present:', (data: DataTable) => {
  for (const [tool, url, description] of data.rows()) {
    Tools.getToolLinkByContent(tool)
      .should('have.attr', 'href')
      .should('equal', url)

    Tools.getToolLinkByContent(tool)
      .parent('dt')
      .next('dd')
      .should('contain', description)
  }
})
