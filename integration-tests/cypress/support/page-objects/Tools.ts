export const Tools = {
  get index() {
    return cy.get('.tools-list')
  },

  get links() {
    return Tools.index.get('dt > a')
  },

  getToolLinkByContent(content: string) {
    return Tools.links.filter(function (this: HTMLElement) {
      return this.innerHTML.indexOf(content) !== -1
    })
  },

  getToolLinkByHref(href: string) {
    return Tools.index.get(`[href="${href}"]`)
  },
}
