import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { Spec } from './types'
import { boundRangeIter } from './util'

type HexGridProps = {
  children: Spec
}

export const HexGrid: FunctionComponent<HexGridProps> = (
  { children: spec },
) => {
  const boundY = boundRangeIter(spec.bounds.y)
  const boundX = boundRangeIter(spec.bounds.x)

  return (
    <div className="hex-grid">
      { boundY.map((row) => (
        <div
          key={ row }
          className={ hexGridRowClassName(row) }
        >
          { boundX.map((col) => (
            <div
              key={ col }
              className={ hexGridCellClassName(col) }
              data-x={ col - Math.floor(row / 2) }
              data-y={ row }
            />
          )) }
        </div>
      )) }
    </div>
  )
}

function hexGridRowClassName(row: number): string {
  return classNames(
    'hex-grid__row',
    {
      'hex-grid__row--odd': row % 2 !== 0,
      'hex-grid__row--even': row % 2 === 0,
    },
  )
}

function hexGridCellClassName(col: number): string {
  return classNames(
    'hex-grid__cell',
    {
      'hex-grid__cell--odd': col % 2 !== 0,
      'hex-grid__cell--even': col % 2 === 0,
    },
  )
}


