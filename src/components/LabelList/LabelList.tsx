import React, { FunctionComponent, ReactElement } from 'react'
import { Label } from '../Label'

export type LabelListProps = {
  children?: React.ReactNode
}

export const LabelList: FunctionComponent<LabelListProps> = ({ children }) => {
  return (
    <ul className="label-list">
      {React.Children.map(children, (child) =>
        (child as ReactElement).type === Label
          ? React.cloneElement(child as ReactElement, { as: 'li' })
          : child
      )}
    </ul>
  )
}
