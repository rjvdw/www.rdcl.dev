import React from 'react'
import { Sidemenu } from '../Sidemenu'
import IconMenu from './icons/menu.svg'
import { Home } from '../pages/Home'

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
        <Home/>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? (
      <Sidemenu sidemenuProps={ { slot: 'sidemenu', 'screen-type': screenType } }/>
    ) : '' }
  </>
)
