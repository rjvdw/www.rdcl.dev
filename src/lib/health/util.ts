export function isoDateString(date: Date): string {
  const iso = date.toISOString()
  const i = iso.indexOf('T')
  return iso.substring(0, i)
}

export function parseDecimal(value: string) {
  return parseFloat(value.replace(',', '.'))
}
