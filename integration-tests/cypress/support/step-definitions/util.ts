export function html(strs: TemplateStringsArray, ...vars: unknown[]): string {
  let full = strs[0]
  for (let i = 0; i < vars.length; i += 1) {
    full += String(vars[i])
    full += strs[i + 1]
  }
  return normalizeHtml(full)
}

export function normalizeHtml(html: string): string {
  return html.trim().replace(/\s+/g, '') // FIXME: Find a better way of normalizing HTML....
}

export function expectContent(value: string): ($el: JQuery) => void {
  return ($el) =>
    expect(normalizeHtml($el.html())).to.equal(normalizeHtml(value))
}
