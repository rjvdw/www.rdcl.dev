export function isoDateString(date: Date): string {
  const iso = date.toISOString()
  const i = iso.indexOf('T')
  return iso.substring(0, i)
}
