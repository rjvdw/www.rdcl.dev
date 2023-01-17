import classNames from 'classnames'
import React, { FunctionComponent } from 'react'

type HexGridRowProps = {
  children: React.ReactNode
  row: number
}
export const HexGridRow: FunctionComponent<HexGridRowProps> = ({
  children,
  row,
}) => (
  <div
    className={classNames(
      'hex-grid__row',
      `hex-grid__row--${row % 2 === 0 ? 'even' : 'odd'}`
    )}
    data-y={row}
  >
    {children}
  </div>
)
