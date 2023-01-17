import classNames from 'classnames'
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'
import { Icon } from './Icon'

type IconButtonProps = {
  icon: keyof typeof Icon
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  className,
  'aria-label': ariaLabel,
  ...buttonProps
}) => {
  const IconComponent = Icon[icon]

  return (
    <button {...buttonProps} className={classNames('icon-button', className)}>
      <IconComponent aria-label={ariaLabel} />
    </button>
  )
}
