import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { normalizeHtml } from '../../../support/step_definitions/util'

When(
  'the user uploads {string} with mime-type {string}',
  (filePath: string, mimeType: string) => {
    cy.get('[data-testid="file"]').attachFile({
      filePath,
      mimeType,
    })
  },
)

When('the user uploads the following files:', (data: DataTable) => {
  cy.get('[data-testid="file"]').attachFile(
    data.rows().map(([filePath, mimeType]) => ({
      filePath,
      mimeType,
    })),
  )
})

Then(
  'the file {string} is shown with contents:',
  (file: string, contents: string) => {
    cy.get(`[data-testid="output-${file}"]`).then(
      ($el: JQuery<HTMLElement>) => {
        expect(normalizeHtml($el.html())).to.equal(normalizeHtml(contents))
      },
    )
  },
)

Then(
  'the file {string} is shown with the error message {string}',
  (file: string, error: string) => {
    cy.get(`[data-testid="error-${file}"]`).then(($el: JQuery<HTMLElement>) => {
      expect($el.html()).to.equal(error)
    })
  },
)
