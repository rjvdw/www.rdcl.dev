import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { BaseCellSpec } from './types'

type HexGridCellProps = {
  row: number
  col: number
  cellSpec?: BaseCellSpec
  debug: boolean
}
export const HexGridCell: FunctionComponent<HexGridCellProps> = ({
  row,
  col,
  cellSpec,
  debug,
}) => (
  <div
    className={classNames(
      'hex-grid__cell',
      `hex-grid__cell--${col % 2 === 0 ? 'even' : 'odd'}`,
      cellSpec?.modifier &&
        `hex-grid__cell--${cellSpec?.modifier?.replace(/\s/g, '-')}`,
      cellSpec?.outOfBounds && 'hex-grid__cell--hidden'
    )}
    data-x={col - Math.floor(row / 2)}
    data-y={row}
  >
    {(() => {
      const inner = debug ? (
        <>
          {row},{col}
        </>
      ) : (
        <>&nbsp;</>
      )

      if (cellSpec?.element) {
        const Element = cellSpec.element
        return <Element>{inner}</Element>
      }

      return inner
    })()}
  </div>
)
