import classNames from 'classnames'
import { FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import { Router } from 'preact-router'
import { Home } from '../pages/Home.tsx'
import { NotFound } from '../pages/NotFound.tsx'
import { Tools } from '../pages/Tools.tsx'
import Icon from './Icon'
import { IconButton } from './IconButton.tsx'
import { MenuItem } from './MenuItem.tsx'
import { Routing } from './Routing.tsx'

export const App: FunctionComponent = () => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  const openSideMenu = () => setSideMenuVisible(true)
  const closeSideMenu = () => setSideMenuVisible(false)

  return (
    <div class="app">
      <Routing>
        <header class="app-header">
          <IconButton
            icon={Icon.OpenSideMenu}
            class="open-side-menu"
            label="Open side menu"
            onClick={openSideMenu}
          />
          rdcl.dev
        </header>

        <main class="app-main">
          <Router>
            <Home path="/" />
            <Tools path="/tools/:rest*" />
            <NotFound default />
          </Router>
        </main>

        <aside
          class={classNames('app-side-menu', {
            visible: sideMenuVisible,
          })}
        >
          <IconButton
            icon={Icon.CloseSideMenu}
            class="close-side-menu"
            label="Close side menu"
            onClick={closeSideMenu}
          />
          <nav class="app-nav">
            <MenuItem href="/" route="home" icon={Icon.Home}>
              Home
            </MenuItem>
            <MenuItem href="/tools" route="tools" icon={Icon.Tools}>
              Tools
            </MenuItem>
          </nav>
        </aside>
      </Routing>
    </div>
  )
}
