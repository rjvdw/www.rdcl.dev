import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Sidemenu } from '../Sidemenu'
import { Home } from '../pages/Home'
import { Tools } from '../pages/Tools'
import { Login } from '../pages/Login'
import { PageHeader } from '../PageHeader'

export const App = ({ screenType }) => (
  <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader pageHeaderProps={ { slot: 'header', screenType: screenType } }/>

      { screenType === 'mobile' ? '' : (
        <Sidemenu sidemenuProps={ { slot: 'sidemenu', screentype: screenType } }/>
      ) }

      <main>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>

          <Route path="/tools">
            <Tools/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? (
      <Sidemenu sidemenuProps={ { slot: 'sidemenu', screentype: screenType } }/>
    ) : '' }
  </>
)
