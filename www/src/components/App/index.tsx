import { FunctionComponent } from 'preact'
import { Router } from 'preact-router'
import { Games } from '../../pages/Games'
import { Health } from '../../pages/Health'
import { Home } from '../../pages/Home'
import { Login } from '../../pages/Login'
import { LoginVerify } from '../../pages/LoginVerify'
import { Logout } from '../../pages/Logout'
import { NotFound } from '../../pages/NotFound'
import { Profile } from '../../pages/Profile'
import { Session } from '../../pages/Session'
import { Tools } from '../../pages/Tools'
import { auth } from '../../state/auth'
import Icon from '../Icon'
import { MenuItem } from '../MenuItem'
import { AppHeader } from './AppHeader'
import { AppSideMenu } from './AppSideMenu'
import { useSideMenu } from './useSideMenu'

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
            <Tools.Countdown path="/tools/countdown" />
            <Tools.DropRates path="/tools/drop-rates" />
            <Tools.MyIp path="/tools/ip" />
          </Tools>
          <Games path="/games/:rest*">
            <Games.Index default />
            <Games.SuperTicTacToe path="/games/super-tic-tac-toe" />
          </Games>
          <Health path="/health" />
          <Login path="/login" />
          <LoginVerify path="/login/verify" />
          <Logout path="/logout" />
          <Profile path="/profile" />
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
            <MenuItem href="/profile" route="profile" icon={Icon.Profile}>
              Profile
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
