import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Agenda } from '../../tools/Agenda'
import { Bmi } from '../../tools/Bmi'
import { Countdown } from '../../tools/Countdown'
import { DropRates } from '../../tools/DropRates'
import { Html } from '../../tools/Html'
import { Qr } from '../../tools/Qr'
import { Ratings } from '../../tools/Ratings'
import { Title } from '../../Title'
import { Timestamp } from '../../tools/Timestamp'

export const Tools = () =>
  <Switch>
    <Route path="/tools/agenda">
      <Title path={ ['agenda', 'tools'] }/>
      <Agenda/>
    </Route>
    <Route path="/tools/html">
      <Title path={ ['html elements', 'tools'] }/>
      <Html/>
    </Route>
    <Route path="/tools/qr">
      <Title path={ ['qr', 'tools'] }/>
      <Qr/>
    </Route>
    <Route path="/tools/countdown">
      <Title path={ ['countdown', 'tools'] }/>
      <Countdown/>
    </Route>
    <Route path="/tools/drop-rates">
      <Title path={ ['drop rates', 'tools'] }/>
      <DropRates/>
    </Route>
    <Route path="/tools/bmi">
      <Title path={ ['bmi', 'tools'] }/>
      <Bmi/>
    </Route>
    <Route path="/tools/ratings">
      <Title path={ ['ratings', 'tools'] }/>
      <Ratings/>
    </Route>
    <Route path="/tools/timestamp">
      <Title path={ ['timestamp', 'tools'] }/>
      <Timestamp/>
    </Route>
    <Route>
      <Menu/>
    </Route>
  </Switch>

const Menu = () => <>
  <h1>Tools</h1>

  <rdcl-tools>
    <rdcl-tool-link>
      <a slot="link" href="/password.html" data-no-history>Generate Password</a>
      Securely generates a password using <code>window.crypto</code>.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/agenda">Concert Agenda</Link>
      An overview of upcoming events at popular venues in the Netherlands.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/timestamp">Timestamp</Link>
      Convert between Unix timestamps and ISO formatted dates.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/html">HTML Elements</Link>
      Demonstrations of assorted HTML elements.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/qr">QR</Link>
      Create QR codes.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/countdown">Countdown</Link>
      Solves the numbers game in Countdown.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/drop-rates">Drop Rate Calculator</Link>
      Given a drop rate, computes how many attempts you actually need to get your item.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/bmi">BMI Calculator</Link>
      Body Mass Index calculator.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/ratings">How to read a rating</Link>
      Given how many reviews out of a total number of reviews are positive, computes a score.
    </rdcl-tool-link>
  </rdcl-tools>
</>
