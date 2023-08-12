import { FunctionComponent } from 'preact'
import { Router } from 'preact-router'
import { Home } from '../../pages/Home.tsx'
import { NotFound } from '../../pages/NotFound.tsx'
import { Tools } from '../../pages/Tools.tsx'
import Icon from '../Icon'
import { MenuItem } from '../MenuItem.tsx'
import { AppHeader } from './AppHeader.tsx'
import { AppSideMenu } from './AppSideMenu.tsx'
import { useSideMenu } from './useSideMenu.ts'

export const Index: FunctionComponent = () => {
  const sideMenu = useSideMenu()

  return (
    <div class="app">
      <AppHeader onShowSideMenu={sideMenu.show}>rdcl.dev</AppHeader>

      <main class="app-main">
        <Router>
          <Home path="/" />
          <Tools path="/tools/:rest*">
            <Tools.Index default />
            <Tools.Dummy1 path="/tools/dummy1" />
            <Tools.Dummy2 path="/tools/dummy2" />
            <Tools.Dummy3 path="/tools/dummy3" />
          </Tools>
          <NotFound default />
        </Router>
      </main>

      <AppSideMenu visible={sideMenu.visible} onHide={sideMenu.hide}>
        <MenuItem href="/" route="home" icon={Icon.Home}>
          Home
        </MenuItem>
        <MenuItem href="/tools" route="tools" icon={Icon.Tools}>
          Tools
        </MenuItem>
      </AppSideMenu>
    </div>
  )
}
