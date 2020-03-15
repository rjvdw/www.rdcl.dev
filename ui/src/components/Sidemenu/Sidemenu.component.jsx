import React, { useEffect, useRef } from 'react'
import IconHome from './icons/home.svg'
import IconTools from './icons/tools.svg'
import { attr } from '../../util/component'

export const Sidemenu = ({ activeRoute, toggle, close, collapsed, ...props }) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current.addEventListener('sidemenu-toggle', toggle)
    ref.current.addEventListener('sidemenu-close', close)

    return () => {
      ref.current.removeEventListener('sidemenu-toggle', toggle)
      ref.current.removeEventListener('sidemenu-close', close)
    }
  })

  return (
    <rdcl-sidemenu
      { ...props }
      ref={ ref }
      collapsed={ attr(collapsed) }
    >
      <rdcl-sidemenu-item href="/" active={ attr(activeRoute === 'home') } onClick={ () => close() }>
        <IconHome slot="icon"/>
        Home
      </rdcl-sidemenu-item>

      <rdcl-sidemenu-item href="/tools" active={ attr(activeRoute === 'tools') } onClick={ () => close() }>
        <IconTools slot="icon"/>
        Tools
      </rdcl-sidemenu-item>
    </rdcl-sidemenu>
  )
}
