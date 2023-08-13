import { FunctionComponent } from 'preact'
import { Router } from 'preact-router'
import { Activities } from '../../pages/Activities.tsx'
import { Health } from '../../pages/Health.tsx'
import { Home } from '../../pages/Home.tsx'
import { Labels } from '../../pages/Labels.tsx'
import { Login } from '../../pages/Login.tsx'
import { LoginVerify } from '../../pages/LoginVerify.tsx'
import { Logout } from '../../pages/Logout.tsx'
import { NotFound } from '../../pages/NotFound.tsx'
import { Session } from '../../pages/Session.tsx'
import { Tools } from '../../pages/Tools.tsx'
import { auth } from '../../state/auth'
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
          <Health path="/health" />
          <Activities path="/activities" />
          <Labels path="/labels" />
          <Login path="/login" />
          <LoginVerify path="/login/verify" />
          <Logout path="/logout" />
          <Session path="/session" />
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
        {auth.value.loggedIn && (
          <>
            <MenuItem href="/health" route="health" icon={Icon.Health}>
              Health
            </MenuItem>
            <MenuItem
              href="/activities"
              route="activities"
              icon={Icon.Activities}
            >
              Activities
            </MenuItem>
            <MenuItem href="/labels" route="labels" icon={Icon.Labels}>
              Labels
            </MenuItem>
            <MenuItem href="/logout" route="logout" icon={Icon.Logout}>
              Logout
            </MenuItem>
          </>
        )}
      </AppSideMenu>
    </div>
  )
}
