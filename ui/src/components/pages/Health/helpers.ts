export function numericInput(value: string): number | '' {
  if (value === '') return ''
  return +value
}

export function formatNumber(number: number | null | undefined, fractionDigits: number = 1): string {
  if (number === null || number === undefined) return ''
  return number.toFixed(fractionDigits)
}
