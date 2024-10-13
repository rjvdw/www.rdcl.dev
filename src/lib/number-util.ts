export function parseDecimal(value: string) {
  return parseFloat(value.replace(',', '.'))
}
