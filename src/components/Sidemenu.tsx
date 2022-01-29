import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { attr } from '../util/component'
import { Icon } from './icons'
import {
  close as closeSidemenu,
  selectIsCollapsed as selectIsSidemenuCollapsed,
  selectIsOpen as selectIsSidemenuOpen,
  toggle as toggleSidemenu
} from '../modules/sidemenu'
import { selectScreenType } from '../modules/screen'
import { selectActiveRoute } from '../modules/routes'

const selectIsCollapsed = createSelector(
  selectScreenType,
  selectIsSidemenuCollapsed,
  selectIsSidemenuOpen,
  (screenType, collapsed, open) => screenType === 'mobile'
    ? !open
    : collapsed
)

export const Sidemenu: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const toggle = () => dispatch(toggleSidemenu())
  const close = () => dispatch(closeSidemenu())

  const ref: React.MutableRefObject<null | HTMLElement> = useRef(null)

  const activeRoute = useSelector(selectActiveRoute)
  const loggedIn = false // TODO
  const screenType = useSelector(selectScreenType)
  const collapsed = useSelector(selectIsCollapsed)

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
      slot="sidemenu"
      screentype={ screenType }
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
