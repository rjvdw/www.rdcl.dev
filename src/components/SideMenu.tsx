import { createSelector } from '@reduxjs/toolkit'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../slices/auth'
import { selectActiveRoute } from '../slices/routes'
import { selectScreenType } from '../slices/screen'
import {
  close as closeSideMenu,
  selectIsCollapsed as selectIsSideMenuCollapsed,
  selectIsOpen as selectIsSideMenuOpen,
  toggle as toggleSideMenu,
} from '../slices/side-menu'
import { StoreDispatch } from '../store'
import { attr } from '../util/component'
import { Icon } from './icons'

const selectIsCollapsed = createSelector(
  selectScreenType,
  selectIsSideMenuCollapsed,
  selectIsSideMenuOpen,
  (screenType, collapsed, open) => screenType === 'mobile'
    ? !open
    : collapsed,
)

export const SideMenu: React.FunctionComponent = () => {
  const dispatch = useDispatch<StoreDispatch>()
  const toggle = () => dispatch(toggleSideMenu())
  const close = () => dispatch(closeSideMenu())

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
    const { current } = ref

    current?.addEventListener('side-menu-toggle', toggle)
    current?.addEventListener('side-menu-close', close)
    current?.addEventListener('click', handleClick)

    return () => {
      current?.removeEventListener('side-menu-toggle', toggle)
      current?.removeEventListener('side-menu-close', close)
      current?.removeEventListener('click', handleClick)
    }
  })

  return (
    <rdcl-side-menu
      slot="side-menu"
      screentype={ screenType }
      ref={ ref }
      collapsed={ attr(collapsed) }
    >
      <rdcl-side-menu-item href="/" active={ attr(activeRoute === 'home') } onClick={ () => close() }>
        <Icon.Home slot="icon"/>
        Home
      </rdcl-side-menu-item>

      <rdcl-side-menu-item href="/tools" active={ attr(activeRoute === 'tools') } onClick={ () => close() }>
        <Icon.Tools slot="icon"/>
        Tools
      </rdcl-side-menu-item>

      { loggedIn && (
        <rdcl-side-menu-item href="/health" active={ attr(activeRoute === 'health') } onClick={ () => close() }>
          <Icon.Health slot="icon"/>
          Health
        </rdcl-side-menu-item>
      ) }
    </rdcl-side-menu>
  )
}
