import React, { useEffect, useRef } from 'react'
import { Icon } from './icons'
import { attr } from '../../util/component'

type SidemenuProps = {
  activeRoute: string,
  loggedIn: boolean,
  toggle: () => void,
  close: () => void,
  collapsed: boolean,

  // TODO: These are just passed along to the custom element
  slot: unknown,
  screentype: unknown,
}

export const Sidemenu: React.FunctionComponent<SidemenuProps> = ({ activeRoute, loggedIn, toggle, close, collapsed, ...props }) => {
  const ref: React.MutableRefObject<null | HTMLElement> = useRef(null)

  useEffect(() => {
    ref.current?.addEventListener('sidemenu-toggle', toggle)
    ref.current?.addEventListener('sidemenu-close', close)

    return () => {
      ref.current?.removeEventListener('sidemenu-toggle', toggle)
      ref.current?.removeEventListener('sidemenu-close', close)
    }
  })

  return (
    <rdcl-sidemenu
      { ...props }
      ref={ ref }
      collapsed={ attr(collapsed) }
    >
      <rdcl-sidemenu-item href="/" active={ attr(activeRoute === 'home') } onClick={ () => close() }>
        <Icon.Home slot="icon"/>
        Home
      </rdcl-sidemenu-item>

      <rdcl-sidemenu-item href="/tools" active={ attr(activeRoute === 'tools') } onClick={ () => close() }>
        <Icon.Tools slot="icon"/>
        Tools
      </rdcl-sidemenu-item>

      { loggedIn && (
        <rdcl-sidemenu-item href="/health" active={ attr(activeRoute === 'health') } onClick={ () => close() }>
          <Icon.Health slot="icon"/>
          Health
        </rdcl-sidemenu-item>
      ) }
    </rdcl-sidemenu>
  )
}
