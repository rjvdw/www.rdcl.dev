const G = 1

export class Body {
  /** @type string */
  #name

  /** @type number */
  #mass

  /** type number */
  #diameter

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

  /** @type string */
  #color

  /** @type boolean */
  #mounted

  constructor(name, mass, diameter, x, y, vx, vy, color) {
    this.#el = document.createElement('div')
    this.#el.classList.add('body', name)
    this.#el.title = name

    this.#name = name
    this.#diameter = diameter
    this.#mass = mass
    this.#x = x
    this.#y = y
    this.#vx = vx
    this.#vy = vy
    this.#color = color

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
        const a = (G * body.#mass) / d ** 2
        const ax = (a / d) * (body.#x - this.#x)
        const ay = (a / d) * (body.#y - this.#y)

        this.#vx += ax
        this.#vy += ay
      }
    }

    this.#x += this.#vx
    this.#y += this.#vy

    for (const body of bodies) {
      if (body !== this && this.#collidesWith(body)) {
        if (body.#mass > this.#mass) {
          body.#absorb(this)
          bodies.splice(bodies.indexOf(this), 1)
          return
        } else {
          this.#absorb(body)
          bodies.splice(bodies.indexOf(body), 1)
        }
      }
    }

    this.#render()
  }

  /**
   * @param {Body} other
   */
  #absorb(other) {
    this.#name += ` & ${other.#name}`
    this.#x =
      (this.#x * this.#mass + other.#x * other.#mass) /
      (this.#mass + other.#mass)
    this.#y =
      (this.#y * this.#mass + other.#y * other.#mass) /
      (this.#mass + other.#mass)
    this.#vx =
      (this.#vx * this.#mass + other.#vx * other.#mass) /
      (this.#mass + other.#mass)
    this.#vy =
      (this.#vy * this.#mass + other.#vy * other.#mass) /
      (this.#mass + other.#mass)
    this.#diameter = Math.sqrt(this.#diameter ** 2 + other.#diameter ** 2)
    this.#mass += other.#mass
    other.#el.remove()
  }

  /**
   * @param {Body} other
   * @returns {boolean}
   */
  #collidesWith(other) {
    return this.distance(other) <= (this.#diameter + other.#diameter) / 2
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
    this.#el.style.left = `${this.#x}px`
    this.#el.style.top = `${this.#y}px`
    this.#el.style.marginLeft = `-${this.#diameter / 2}px`
    this.#el.style.marginTop = `-${this.#diameter / 2}px`
    this.#el.style.width = `${this.#diameter}px`
    this.#el.style.height = `${this.#diameter}px`
    this.#el.style.background = `${this.#color}`

    if (
      this.#x < -100 ||
      this.#x > window.innerWidth + 100 ||
      this.#y < -100 ||
      this.#y > window.innerHeight + 100
    ) {
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
