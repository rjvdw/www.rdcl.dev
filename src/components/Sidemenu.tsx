import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { StoreDispatch } from '../store'
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
import { selectIsLoggedIn } from '../modules/auth'

const selectIsCollapsed = createSelector(
  selectScreenType,
  selectIsSidemenuCollapsed,
  selectIsSidemenuOpen,
  (screenType, collapsed, open) => screenType === 'mobile'
    ? !open
    : collapsed
)

export const Sidemenu: React.FunctionComponent = () => {
  const dispatch = useDispatch<StoreDispatch>()
  const toggle = () => dispatch(toggleSidemenu())
  const close = () => dispatch(closeSidemenu())

  const ref: React.MutableRefObject<null | HTMLElement> = useRef(null)

  const activeRoute = useSelector(selectActiveRoute)
  const loggedIn = useSelector(selectIsLoggedIn)
  const screenType = useSelector(selectScreenType)
  const collapsed = useSelector(selectIsCollapsed)

  const navigate = useNavigate()
  const handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented) {
      return
    }

    if (event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
      // user is trying to open a new tab, don't interfere
      return
    }

    const element = event.composedPath().find(el => (el as HTMLAnchorElement).href) as HTMLAnchorElement

    if (element && !element.dataset.noHistory && element.origin === window.location.origin) {
      event.preventDefault()
      navigate(element.pathname)
    }
  }

  useEffect(() => {
    ref.current?.addEventListener('sidemenu-toggle', toggle)
    ref.current?.addEventListener('sidemenu-close', close)
    ref.current?.addEventListener('click', handleClick)

    return () => {
      ref.current?.removeEventListener('sidemenu-toggle', toggle)
      ref.current?.removeEventListener('sidemenu-close', close)
      ref.current?.removeEventListener('click', handleClick)
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
