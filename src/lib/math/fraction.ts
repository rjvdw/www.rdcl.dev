/**
 * Represents a fractional value.
 */
export class Fraction {
  readonly #numerator: number
  readonly #denominator: number

  public static readonly ZERO: Fraction = new Fraction(0)

  /**
   * Construct a fraction from an integer numerator and an integer
   * denominator.
   */
  constructor(numerator: number, denominator: number)
  /**
   * Construct a fraction from an integer value.
   */
  constructor(value: number)
  constructor(numerator: number, denominator?: number) {
    if (denominator === undefined) {
      denominator = 1
    }
    if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
      throw new Error('Numerator and denominator must both be integer values')
    }
    if (denominator < 0) {
      numerator = -numerator
      denominator = -denominator
    }
    const g = gcd(Math.abs(numerator), denominator)
    this.#numerator = numerator / g
    this.#denominator = denominator / g
  }

  /**
   * Parse a string representation of a fraction to a Fraction.
   */
  static parse(str: string): Fraction {
    const parts: number[] = str
      .split('/')
      .map((part) => part.trim())
      .map((part) => parseInt(part))

    if (parts.length === 1) {
      return new Fraction(parts[0]!)
    }

    if (parts.length === 2) {
      return new Fraction(parts[0]!, parts[1]!)
    }

    throw new Error('Invalid input: ' + str)
  }

  /**
   * The numerator of this fraction. If the fraction is negative, this
   * number will also be negative.
   */
  get numerator(): number {
    return this.#numerator
  }

  /**
   * The denominator of this fraction. If the fraction is negative, this
   * number will still be positive.
   */
  get denominator(): number {
    return this.#denominator
  }

  /**
   * Check if two fractions are equal.
   */
  equals(other: Fraction): boolean {
    return this.#numerator === other.#numerator && this.#denominator === other.#denominator
  }

  /**
   * Compares two fractions and returns a number indicating if the this
   * fraction is smaller than (< 0), equal to (= 0) or greater than
   * (> 0) the other fraction.
   */
  compareTo(other: Fraction): number {
    return this.#numerator * other.#denominator - other.#numerator * this.#denominator
  }

  /**
   * Return a string representation of this fraction.
   */
  toString(): string {
    if (this.#denominator === 1) {
      return '' + this.#numerator
    }
    return '' + this.#numerator + ' / ' + this.#denominator
  }

  /**
   * Add a value to this fraction.
   */
  add(other: Fraction): Fraction
  add(other: number): Fraction
  add(other: Fraction | number): Fraction {
    if (typeof other === 'number') {
      return new Fraction(this.#numerator + this.#denominator * other, this.#denominator)
    }
    return new Fraction(
      this.#numerator * other.#denominator + other.#numerator * this.#denominator,
      this.#denominator * other.#denominator,
    )
  }

  /**
   * Subtract a value from this fraction.
   */
  subtract(other: Fraction): Fraction
  subtract(other: number): Fraction
  subtract(other: Fraction | number): Fraction {
    if (typeof other === 'number') {
      return new Fraction(this.#numerator - this.#denominator * other, this.#denominator)
    }
    return new Fraction(
      this.#numerator * other.#denominator - other.#numerator * this.#denominator,
      this.#denominator * other.#denominator,
    )
  }

  /**
   * Multiply this fraction by a value.
   */
  multiply(other: Fraction): Fraction
  multiply(other: number): Fraction
  multiply(other: Fraction | number): Fraction {
    if (typeof other === 'number') {
      return new Fraction(this.#numerator * other, this.#denominator)
    }
    return new Fraction(this.#numerator * other.#numerator, this.#denominator * other.#denominator)
  }

  /**
   * Divide this fraction by a value.
   */
  divide(other: Fraction): Fraction
  divide(other: number): Fraction
  divide(other: Fraction | number): Fraction {
    if (typeof other === 'number') {
      return new Fraction(this.#numerator, this.#denominator * other)
    }
    return new Fraction(this.#numerator * other.#denominator, this.#denominator * other.#numerator)
  }
}

/**
 * Compute the greatest common divisor of two integers.
 */
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = a
    a = b
    b = t % b
  }
  return a
}
