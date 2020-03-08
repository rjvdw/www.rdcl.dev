import React from 'react'
import { Sidemenu } from '../Sidemenu'

export const App = () => (
  <rdcl-grid>
    <header className="page-header" slot="header">rdcl.dev</header>
    <Sidemenu/>
    <main>
      <h1>Hello, World!</h1>
    </main>
  </rdcl-grid>
)
