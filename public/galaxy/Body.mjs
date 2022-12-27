const G = 1

export class Body {
  /** @type number */
  #mass

  /** @type number */
  #x

  /** @type number */
  #y

  /** @type number */
  #vx

  /** @type number */
  #vy

  /** @type HTMLDivElement */
  #el

  /** @type boolean */
  #mounted

  constructor(name, mass, x, y, vx, vy) {
    this.#el = document.createElement('div')
    this.#el.classList.add('body', name)
    this.#el.title = name

    this.#mass = mass
    this.#x = x
    this.#y = y
    this.#vx = vx
    this.#vy = vy

    this.#render()
  }

  /**
   * @returns {number}
   */
  get x() {
    return this.#x
  }

  /**
   * @returns {number}
   */
  get y() {
    return this.#y
  }

  /**
   * @param {Body} other
   */
  distance(other) {
    return Math.sqrt((this.#x - other.#x) ** 2 + (this.#y - other.#y) ** 2)
  }

  /**
   * @param {Body[]} bodies
   */
  update(bodies) {
    for (const body of bodies) {
      if (body !== this) {
        let d = this.distance(body)
        const a = G * body.#mass / d ** 2
        const ax = a / d * (body.#x - this.#x)
        const ay = a / d * (body.#y - this.#y)

        this.#vx += ax
        this.#vy += ay
      }
    }

    this.#x += this.#vx
    this.#y += this.#vy

    this.#render()
  }

  /**
   * @param {*} el
   * @returns {boolean}
   */
  is(el) {
    return this.#el === el
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  center(x, y) {
    this.#x += x
    this.#y += y
  }

  #render() {
    this.#el.style.left = `${ this.#x }px`
    this.#el.style.top = `${ this.#y }px`

    if (this.#x < -100 || this.#x > window.innerWidth + 100 || this.#y < -100 || this.#y > window.innerHeight + 100) {
      if (this.#mounted) {
        this.#el.remove()
        this.#mounted = false
      }
    } else if (!this.#mounted) {
      document.body.appendChild(this.#el)
      this.#mounted = true
    }
  }
}
