export function html(strs: TemplateStringsArray, ...vars: unknown[]): string {
  let full = strs[0]
  for (let i = 0; i < vars.length; i += 1) {
    full += vars[i]
    full += strs[i + 1]
  }
  return minifyHtml(full)
}

export function minifyHtml(html: string): string {
  return html
    .trim()
    .replace(/>\s+</g, '><')
}
