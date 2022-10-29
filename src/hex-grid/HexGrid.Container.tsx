import classNames from 'classnames'
import React, { FunctionComponent } from 'react'

type HexGridContainerProps = {
  children: React.ReactNode
  offset: 'odd' | 'even'
}
export const HexGridContainer: FunctionComponent<HexGridContainerProps> = (
  { children, offset },
) => (
  <div
    className={ classNames(
      'hex-grid',
      `hex-grid--offset-${ offset }`,
    ) }
  >
    { children }
  </div>
)
