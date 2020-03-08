import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { ConcertAgenda } from '../../tools/ConcertAgenda'
import './Tools.styles.sass'

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

  <ul>
    <li className="tool-item">
      <a href="/password.html" data-no-history>Generate Password</a>
      Securely generates a password using <code>window.crypto</code>
    </li>
    <li className="tool-item">
      <Link to="/tools/agenda">Concert Agenda</Link>
      An overview of upcoming events at popular venues in the Netherlands.
    </li>
  </ul>
</>
