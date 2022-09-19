import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveRoute } from '../../slices/routes'
import { selectScreenType } from '../../slices/screen'
import { Icon } from '../Icon'
import { useSideMenuRef } from './SideMenu.hooks'
import { selectIsCollapsed } from './SideMenu.selectors'

export const SideMenu: FunctionComponent = () => {
  const activeRoute = useSelector(selectActiveRoute)
  const screenType = useSelector(selectScreenType)
  const collapsed = useSelector(selectIsCollapsed)

  const ref = useSideMenuRef()

  return (
    <rdcl-side-menu
      slot="side-menu"
      screentype={ screenType }
      ref={ ref }
      collapsed={ collapsed }
    >
      <rdcl-side-menu-item href="/" active={ activeRoute === 'home' }>
        <Icon.Home slot="icon"/>
        Home
      </rdcl-side-menu-item>

      <rdcl-side-menu-item href="/tools" active={ activeRoute === 'tools' }>
        <Icon.Tools slot="icon"/>
        Tools
      </rdcl-side-menu-item>
    </rdcl-side-menu>
  )
}
