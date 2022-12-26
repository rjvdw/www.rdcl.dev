/**
 * @param {number} max
 * @returns {number}
 */
export function rand(max) {
  return Math.floor(Math.random() * max)
}

/**
 * @returns {number}
 */
export function randSign() {
  return Math.random() > .5 ? -1 : 1
}
