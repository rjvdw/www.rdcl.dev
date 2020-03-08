/**
 * Workaround for boolean attributes. Returns the correct values to show or not show the attribute.
 *
 * @param {boolean} b
 * @returns {false|undefined}
 */
export function attr(b) {
  return b ? '' : undefined
}
