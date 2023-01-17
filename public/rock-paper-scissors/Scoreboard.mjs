import { PAPER, ROCK, SCISSORS } from './Entity.mjs'

export class Scoreboard {
  /** @type HTMLElement */
  #el

  constructor() {
    this.#el = document.createElement('div')
    this.#el.classList.add('scoreboard')
    document.body.appendChild(this.#el)
  }

  /**
   * @returns {DOMRect}
   */
  getBoundingClientRect() {
    return this.#el.getBoundingClientRect()
  }

  /**
   * @param {Entity[]} entities
   */
  update(entities) {
    let rock = 0
    let paper = 0
    let scissors = 0

    for (const e of entities) {
      if (e.type === ROCK) {
        rock += 1
      }
      if (e.type === PAPER) {
        paper += 1
      }
      if (e.type === SCISSORS) {
        scissors += 1
      }
    }

    this.#el.innerHTML = `
      ${ROCK} - ${rock}<br>
      ${PAPER} - ${paper}<br>
      ${SCISSORS} - ${scissors}<br>
    `
  }
}
