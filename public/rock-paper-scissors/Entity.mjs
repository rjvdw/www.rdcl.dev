import { rand, randSign } from './util.mjs'

export const ROCK = '🪨'
export const PAPER = '📄'
export const SCISSORS = '✂️'

export class Entity {
  /** @type number */
  #width

  /** @type number */
  #height

  /** @type number */
  #x

  /** @type number */
  #y

  /** @type number */
  #vx

  /** @type number */
  #vy

  /** @type string */
  #type

  /** @type HTMLElement */
  #el

  /**
   * @param {number} width
   * @param {number} height
   * @param {number} x
   * @param {number} y
   * @param {number} vx
   * @param {number} vy
   * @param {string} type
   */
  constructor(width, height, x, y, vx, vy, type) {
    this.#width = width
    this.#height = height
    this.#x = x
    this.#y = y
    this.#vx = vx
    this.#vy = vy
    this.#type = type
    this.#el = document.createElement('div')
    this.#el.classList.add('entity')
    document.body.appendChild(this.#el)
  }

  /**
   * @param {number} width
   * @param {number} height
   */
  static random(width, height) {
    return new Entity(
      width,
      height,
      rand(width - 20),
      rand(height - 20),
      randSign() * (rand(5) + 2) / 4,
      randSign() * (rand(5) + 2) / 4,
      {
        0: ROCK,
        1: PAPER,
        2: SCISSORS,
      }[rand(3)],
    )
  }

  /**
   * @returns {string}
   */
  get type() {
    return this.#type
  }

  /**
   * @param {Scoreboard} scoreboard
   */
  tick(scoreboard) {
    const { left, bottom } = scoreboard.getBoundingClientRect()

    this.#x += this.#vx
    if (this.#x <= 0) {
      this.#x = -this.#x
      this.#vx *= -1
    }
    if (this.#x + 20 >= this.#width) {
      this.#x = this.#width - (this.#x + 20 - this.#width) - 20
      this.#vx *= -1
    }
    if (this.#x + 20 >= left && this.#y <= bottom) {
      this.#x = left - (this.#x + 20 - left) - 21
      this.#vx *= -1
    }

    this.#y += this.#vy
    if (this.#y <= 0) {
      this.#y = -this.#y
      this.#vy *= -1
    }
    if (this.#y + 20 >= this.#height) {
      this.#y = this.#height - (this.#y + 20 - this.#height) - 20
      this.#vy *= -1
    }
    if (this.#x + 20 >= left && this.#y <= bottom) {
      this.#y = bottom + (bottom - this.#y) + 1
      this.#vy *= -1
    }
  }

  render() {
    this.#el.innerHTML = this.#type
    this.#el.style.top = `${ this.#y }px`
    this.#el.style.left = `${ this.#x }px`
  }

  /**
   * @param {Entity} other
   */
  detectCollision(other) {
    if (Math.abs(this.#x - other.#x) <= 20 && Math.abs(this.#y - other.#y) <= 20) {
      if (this.#type === ROCK && other.#type === PAPER) {
        this.#type = PAPER
      } else if (this.#type === PAPER && other.#type === SCISSORS) {
        this.#type = SCISSORS
      } else if (this.#type === SCISSORS && other.#type === ROCK) {
        this.#type = ROCK
      }
    }
  }
}
