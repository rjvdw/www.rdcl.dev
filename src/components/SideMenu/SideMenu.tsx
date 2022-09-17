import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RdclSideMenu } from '../../elements/grid/rdcl-side-menu'
import { selectActiveRoute } from '../../slices/routes'
import { selectScreenType } from '../../slices/screen'
import { attr } from '../../util/component'
import { Icon } from '../icons'
import { selectIsCollapsed } from './selectIsCollapsed'
import { useSideMenuControls } from './useSideMenuControls'

export const SideMenu: FunctionComponent = () => {
  const activeRoute = useSelector(selectActiveRoute)
  const screenType = useSelector(selectScreenType)
  const collapsed = useSelector(selectIsCollapsed)

  const { ref, close } = useSideMenuControls<RdclSideMenu>()

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
    </rdcl-side-menu>
  )
}
