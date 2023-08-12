import { FunctionComponent } from 'preact'
import { MenuItem } from './MenuItem.tsx'
import Icon from './Icon'
import { useState } from 'preact/hooks'
import classNames from 'classnames'
import { IconButton } from './IconButton.tsx'

export const App: FunctionComponent = () => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  const openSideMenu = () => setSideMenuVisible(true)
  const closeSideMenu = () => setSideMenuVisible(false)

  return (
    <div class="app">
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
        <h1>Hello, World!</h1>
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
    </div>
  )
}
