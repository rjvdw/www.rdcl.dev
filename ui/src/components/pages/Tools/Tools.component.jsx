import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { ConcertAgenda } from '../../tools/ConcertAgenda'

export const Tools = () => <>
  <Switch>
    <Route path="/tools/agenda">
      <ConcertAgenda/>
    </Route>
    <Route>
      <Menu/>
    </Route>
  </Switch>
</>

const Menu = () => <>
  <h1>Tools</h1>

  <rdcl-tools>
    <rdcl-tool-link>
      <a slot="link" href="/password.html" data-no-history>Generate Password</a>
      Securely generates a password using <code>window.crypto</code>
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/agenda">Concert Agenda</Link>
      An overview of upcoming events at popular venues in the Netherlands.
    </rdcl-tool-link>
  </rdcl-tools>
</>
