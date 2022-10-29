export interface Range extends Iterable<number> {
  /**
   * The start index of this range.
   */
  start: number

  /**
   * The end index of this range.
   */
  end: number

  /**
   * Creates a range with a different start index.
   *
   * @param start
   */
  withStart(start: number): Range

  /**
   * Creates a range with a different end index.
   *
   * @param end
   */
  withEnd(end: number): Range
}

export class RangeExclusive implements Range {
  readonly #start: number
  readonly #end: number

  constructor(start: number, end: number) {
    this.#start = start
    this.#end = end
  }

  get start() {
    return this.#start
  }

  withStart(start: number) {
    return new RangeInclusive(start, this.#end)
  }

  get end() {
    return this.#end
  }

  withEnd(end: number) {
    return new RangeInclusive(this.#start, end)
  }

  *[Symbol.iterator]() {
    for (let i = this.#start; i < this.#end; i += 1) {
      yield i
    }
  }
}

export class RangeInclusive implements Range {
  readonly #start: number
  readonly #end: number

  constructor(start: number, end: number) {
    this.#start = start
    this.#end = end
  }

  get start() {
    return this.#start
  }

  withStart(start: number) {
    return new RangeInclusive(start, this.#end)
  }

  get end() {
    return this.#end
  }

  withEnd(end: number) {
    return new RangeInclusive(this.#start, end)
  }

  *[Symbol.iterator]() {
    for (let i = this.#start; i <= this.#end; i += 1) {
      yield i
    }
  }
}

/**
 * Constructs a Range from a specification of the form `start..end` (for an exclusive range) or `start..=end` (for an inclusive range).
 *
 * @example
 *
 *     const range1 = range`-5..10`
 *     const range2 = range`12..=30`
 *
 * @param strings
 * @param args
 */
export function range(strings: TemplateStringsArray, ...args: unknown[]): Range {
  let str = strings[0]
  for (let i = 0; i < args.length; i += 1) {
    str += args[i] + strings[i + 1]
  }

  const matchInclusive = str.match(/^(?<start>.*)\.\.=(?<end>.*)$/)
  if (matchInclusive) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { start, end } = matchInclusive.groups!
    return new RangeInclusive(parseInt(start), parseInt(end))
  }

  const matchExclusive = str.match(/^(?<start>.*)\.\.(?<end>.*)$/)
  if (matchExclusive) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { start, end } = matchExclusive.groups!
    return new RangeExclusive(parseInt(start), parseInt(end))
  }

  throw new Error(`Invalid range specification: ${ str }`)
}
