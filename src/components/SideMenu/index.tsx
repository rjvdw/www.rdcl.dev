import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../slices/auth'
import { selectScreenType } from '../../slices/screen'
import { Icon } from '../Icon'
import { Item } from './Item'
import { useSideMenuRef } from './SideMenu.hooks'
import { selectIsCollapsed } from './SideMenu.selectors'

export { useClose, useOpen, useToggle } from './SideMenu.hooks'

export const SideMenu: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)
  const collapsed = useSelector(selectIsCollapsed)
  const loggedIn = useSelector(selectIsLoggedIn)

  const ref = useSideMenuRef()

  return (
    <rdcl-side-menu
      slot="side-menu"
      screentype={screenType}
      ref={ref}
      collapsed={collapsed}
    >
      <Item href="/" route="home" icon={Icon.Home}>
        Home
      </Item>
      <Item href="/tools" route="tools" icon={Icon.Tools}>
        Tools
      </Item>

      {loggedIn && (
        <>
          <Item href="/health" route="health" icon={Icon.Health}>
            Health
          </Item>
          <Item href="/activities" route="activities" icon={Icon.Activities}>
            Activities
          </Item>
          <Item href="/labels" route="labels" icon={Icon.Labels}>
            Labels
          </Item>
          <Item href="/logout" route="logout" icon={Icon.Logout}>
            Logout
          </Item>
        </>
      )}
    </rdcl-side-menu>
  )
}
