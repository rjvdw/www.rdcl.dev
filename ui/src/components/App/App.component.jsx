import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageHeader } from '../PageHeader'
import { Sidemenu } from '../Sidemenu'
import { Botw } from '../pages/Botw'
import { ConnectFour } from '../pages/ConnectFour'
import { Home } from '../pages/Home'
import { Tools } from '../pages/Tools'
import { Login } from '../pages/Login'
import { Health } from '../pages/Health'
import { Title } from '../Title'

export const App = ({ screenType, loggedIn }) => (
  <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader slot="header" screentype={ screenType }/>

      { screenType === 'mobile' ? '' : (
        <Sidemenu slot="sidemenu" screentype={ screenType }/>
      ) }

      <main>
        <Switch>
          <Route path="/" exact>
            <Title/>
            <Home/>
          </Route>

          <Route path="/login">
            <Title title="login"/>
            <Login/>
          </Route>

          <Route path="/tools">
            <Title title="tools"/>
            <Tools/>
          </Route>

          <Route path="/health">
            <Title title="health"/>
            { loggedIn ? <Health/> : <Login/> }
          </Route>

          <Route path="/botw">
            <Title title="botw"/>
            <Botw/>
          </Route>

          <Route path="/connect-four">
            <Title title="connect four"/>
            <ConnectFour/>
          </Route>
        </Switch>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? (
      <Sidemenu slot="sidemenu" screentype={ screenType }/>
    ) : '' }
  </>
)
