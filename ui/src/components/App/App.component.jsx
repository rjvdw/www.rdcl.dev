import React from 'react'
import { Sidemenu } from '../Sidemenu'

export const App = ({ screenType }) => (
  <rdcl-grid screen-type={ screenType }>
    <header className="page-header" slot="header">rdcl.dev</header>
    <Sidemenu sidemenuProps={ { slot: 'sidemenu', 'screen-type': screenType } }/>
    <main>
      <h1>Hello, World!</h1>
    </main>
  </rdcl-grid>
)
