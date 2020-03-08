import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Sidemenu } from '../Sidemenu'
import IconMenu from './icons/menu.svg'
import { Home } from '../pages/Home'
import { Tools } from '../pages/Tools'

export const App = ({ screenType, openSidemenu }) => (
  <>
    <rdcl-grid screen-type={ screenType }>
      <header className="page-header" slot="header">
        rdcl.dev

        { screenType === 'mobile' ? (
          <IconMenu onClick={ () => openSidemenu() } role="button" tabIndex={ 0 } className="page-header__menu-button"/>
        ) : '' }
      </header>

      { screenType === 'mobile' ? '' : (
        <Sidemenu sidemenuProps={ { slot: 'sidemenu', 'screen-type': screenType } }/>
      ) }

      <main>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>

          <Route path="/tools">
            <Tools/>
          </Route>
        </Switch>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? (
      <Sidemenu sidemenuProps={ { slot: 'sidemenu', 'screen-type': screenType } }/>
    ) : '' }
  </>
)
