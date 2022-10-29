import classNames from 'classnames'
import React from 'react'
import { Range } from '../lib/Range'
import { BaseCellSpec, Spec } from './types'

const DEFAULT_OFFSET = 'odd'

type HexGridProps<T extends BaseCellSpec> = {
  children: Spec<T>
  debug?: boolean
}

export class HexGrid<T extends BaseCellSpec> extends React.Component<HexGridProps<T>, never> {
  render() {
    const { children: spec, debug = false } = this.props
    const boundY = Array.from(spec.bounds.y)

    return (
      <div className={ hexGridClassName(spec) }>
        { boundY.map((row) => (
          <div
            key={ row }
            className={ hexGridRowClassName(row) }
            data-y={ row }
          >
            { Array.from(getBoundX(spec, row)).map((col) => (
              <div
                key={ col }
                className={ hexGridCellClassName(col, spec.cells?.[row]?.cells?.[col]) }
                data-x={ col - Math.floor(row / 2) }
                data-y={ row }
              >{ debug ? `${ row },${ col }` : null }</div>
            )) }
          </div>
        )) }
      </div>
    )
  }
}

/**
 * Determine the x-bounds from the specification.
 *
 * @param spec
 * @param row
 */
function getBoundX(spec: Spec, row: number): Range {
  return spec.cells?.[row]?.bounds ?? spec.bounds.x
}

/**
 * Determine the class for the hex grid container.
 *
 * @param spec
 */
function hexGridClassName(spec: Spec): string {
  return classNames(
    'hex-grid',
    `hex-grid--offset-${ spec.offset ?? DEFAULT_OFFSET }`,
  )
}

/**
 * Determine the class for a row within the hex grid.
 *
 * @param row
 */
function hexGridRowClassName(row: number): string {
  return classNames(
    'hex-grid__row',
    `hex-grid__row--${ row % 2 === 0 ? 'even' : 'odd' }`,
  )
}

/**
 * Determine the class for a cell within the hex grid.
 *
 * @param col
 * @param cellSpec
 */
function hexGridCellClassName(col: number, cellSpec?: BaseCellSpec): string {
  return classNames(
    'hex-grid__cell',
    `hex-grid__cell--${ col % 2 === 0 ? 'even' : 'odd' }`,
    cellSpec?.modifier && `hex-grid__cell--${ cellSpec?.modifier?.replace(/\s/g, '-') }`,
    cellSpec?.outOfBounds && 'hex-grid__cell--hidden',
  )
}
