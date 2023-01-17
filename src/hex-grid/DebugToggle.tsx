import classNames from 'classnames'
import React, { FunctionComponent } from 'react'

export type DebugToggleProps = {
  debug: boolean
  toggle: (value: boolean) => void
}

export const DebugToggle: FunctionComponent<DebugToggleProps> = ({
  debug,
  toggle,
}) => (
  <label
    className={classNames(
      'debug-toggle',
      `debug-toggle--${debug ? 'on' : 'off'}`
    )}
  >
    <input
      type="checkbox"
      checked={debug}
      onChange={(event) => toggle((event.target as HTMLInputElement).checked)}
    />
    debug
  </label>
)
