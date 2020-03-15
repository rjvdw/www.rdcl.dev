/**
 * Workaround for boolean attributes. Returns the correct values to show or not show the attribute.
 *
 * @param {boolean} b
 * @returns {false|undefined}
 */
export function attr(b) {
  return b ? '' : undefined
}

/**
 * Convenience method for preventing the default on an event handler.
 *
 * @param {function} handler
 * @returns {function}
 */
export function preventDefault(handler) {
  return event => {
    event.preventDefault()
    handler(event)
  }
}
