import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Title } from '../../Title'
import { Menu } from './Menu'
import { ErrorBoundary } from '../../ErrorBoundary'

const Agenda = React.lazy(() => import('../../tools/Agenda'))
const Bmi = React.lazy(() => import('../../tools/Bmi'))
const Countdown = React.lazy(() => import('../../tools/Countdown'))
const DropRates = React.lazy(() => import('../../tools/DropRates'))
const Html = React.lazy(() => import('../../tools/Html'))
const Ratings = React.lazy(() => import('../../tools/Ratings'))
const Qr = React.lazy(() => import('../../tools/Qr'))
const Timestamp = React.lazy(() => import('../../tools/Timestamp'))

export const Tools = () =>
  <ErrorBoundary>
    <Suspense fallback={ <rdcl-spinner/> }>
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
    </Suspense>
  </ErrorBoundary>

export default Tools
