import { parseDecimal } from '$lib/number-util'

export const DEFAULT_NR = 3

export function getNumeric(
  params: URLSearchParams,
  field: string,
): number | null {
  const value = params.get(field)

  return value == null ? null : parseDecimal(value)
}

export function getMatrix(params: URLSearchParams): number[][] {
  const nr = getNumeric(params, 'nr') ?? DEFAULT_NR

  const matrix: number[][] = Array(nr)
    .fill(null)
    .map((_) => Array(nr + 1).fill(0))

  for (const [key, value] of params) {
    const xMatch = key.match(/^x\[(\d+)\]\[(\d+)\]$/)
    if (xMatch) {
      const row = +xMatch[1]!
      const column = +xMatch[2]!
      matrix[row]![column] = +value
    }

    const yMatch = key.match(/^y\[(\d+)\]$/)
    if (yMatch) {
      const row = +yMatch[1]!
      const column = nr
      matrix[row]![column] = +value
    }
  }

  return matrix
}

export function repeat(n: number): number[] {
  return Array(n)
    .fill(null)
    .map((_, i) => i)
}
