import { range } from '../../lib/Range'
import { RowSpec, Spec } from '../types'
import { CELL_CHAR_WIDTH, CELL_MODIFIERS } from './constants'
import { CatanCellSpec } from './types'
import { isResourceTile } from './util'

/**
 * Parse the raw board specification.
 *
 * @param str
 * @param values
 */
export function catan([str]: TemplateStringsArray, values: number[]): Spec<CatanCellSpec> {
  const lines = splitLines(str)
  const offset = determineOffset(lines)
  const cellSpecs: Record<number, RowSpec<CatanCellSpec>> = {}

  const isOffset = (row: number) =>
    row % 2 === 0
      ? offset === 'even'
      : offset === 'odd'

  let maxX = 0
  let maxY = 0
  const valuesIter = valuesToIter(values)
  for (const line of lines) {
    const row = maxY += 1
    const cells = splitCells(line, isOffset(row), valuesIter)
    const rowSpec = cellSpecs[row] = {
      bounds: range`1..=${ cells.length }`,
      cells: {} as Record<number, CatanCellSpec>,
    }

    if (maxX < cells.length) {
      maxX = cells.length
    }

    for (const [col, cell] of withIndex(cells)) {
      rowSpec.cells[col] = cell
    }
  }

  if (!valuesIter.next().done) {
    throw new InvalidCatanBoard('too many values provided')
  }

  for (let row = 1; row <= maxY; row += 1) {
    for (let col = 1; col <= maxX; col += 1) {
      if (!cellSpecs[row].cells?.[col]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cellSpecs[row].cells![col] = {
          outOfBounds: true,
        }
      }
    }
  }

  return {
    bounds: {
      x: range`1..=${ maxX }`,
      y: range`1..=${ maxY }`,
    },
    offset,
    cells: cellSpecs,
  }
}

/**
 * Returns an iterator that iterates over the provided values.
 *
 * @param values
 */
function* valuesToIter(values: number[]) {
  for (let i = 0; i < values.length; i += 1) {
    yield values[i]
  }
}

/**
 * Determines whether the even or the odd lines should get an offset.
 *
 * @param lines
 */
function determineOffset(lines: string[]): 'odd' | 'even' {
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].startsWith('| ')) {
      // since this line does not start with a space, it should _not_ get an offset
      return (i + 1) % 2 === 0
        ? 'odd'
        : 'even'
    }
  }

  throw new InvalidCatanBoard()
}

/**
 * Take the raw input and return its normalized lines.
 *
 * @param board
 */
function splitLines(board: string): string[] {
  return board
    .split('\n') // split into lines
    .map(l => l.trim()) // get rid of leading and trailing whitespace
    .filter(Boolean) // get rid of any empty lines
}

/**
 * Take a line and return its normalized cells.
 *
 * @param line
 * @param isOffset Whether this line includes an offset
 * @param values
 */
function splitCells(line: string, isOffset: boolean, values: Generator<number>): CatanCellSpec[] {
  if (!line.startsWith('|') || !line.endsWith('|')) {
    throw new InvalidCatanBoard()
  }

  const lineStart = 1 + (isOffset ? CELL_CHAR_WIDTH : 0)
  const lineEnd = line.length - 1

  const parseCellSpec = (cell: string): CatanCellSpec => {
    if (cell === '') {
      return { outOfBounds: true }
    }

    const tile = CELL_MODIFIERS[cell]
    if (!tile) {
      throw new InvalidCatanBoard(`could not parse tile ${ cell }`)
    }

    if (isResourceTile(tile)) {
      const value = values.next()
      if (value.done) {
        throw new InvalidCatanBoard('insufficient values provided')
      }
      return {
        outOfBounds: false,
        modifier: tile,
        value: value.value,
      }
    }

    return {
      outOfBounds: false,
      modifier: tile,
    }
  }

  const cells: CatanCellSpec[] = []
  for (let i = lineStart; i < lineEnd; i += 2 * CELL_CHAR_WIDTH) {
    const cell = line.substring(i, i + CELL_CHAR_WIDTH).trim()
    cells.push(parseCellSpec(cell))
  }

  return cells
}

/**
 * Convenience method to loop over an array and also get its index.
 *
 * @param list
 * @param offset
 */
function withIndex<T>(list: T[], offset = 0): Array<[number, T]> {
  return list.map((el, i) => [i + offset + 1, el])
}

/**
 * Thrown when the board specification can not be parsed.
 */
class InvalidCatanBoard extends Error {
  constructor(reason = '') {
    super('Invalid Catan board' + (reason && `: ${ reason }`))
  }
}
