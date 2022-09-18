/**
 * Checks whether an optional number is defined and not NaN.
 */
export function isValid(value: number | undefined): value is number {
  return value !== undefined && !Number.isNaN(value)
}

/**
 * Rounds a number to the specified number of digits.
 */
export function rounded(value: number, digits: number): number {
  return Number(value.toFixed(digits))
}
