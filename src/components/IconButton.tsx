import { FunctionComponent, JSX } from 'preact'
import { IconComponent } from './Icon'

export type IconButtonProps = {
  icon: IconComponent
  label: string
} & Omit<JSX.HTMLAttributes, 'alt' | 'icon' | 'label'>

export const IconButton: FunctionComponent<IconButtonProps> = ({
  icon: Icon,
  label,
  class: clz,
  ...props
}) => (
  <button class={`icon-button ${String(clz)}`} title={label} {...props}>
    <Icon alt={label} />
  </button>
)
