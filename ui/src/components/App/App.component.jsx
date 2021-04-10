import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageHeader } from '../PageHeader'
import { Sidemenu } from '../Sidemenu'
import { Title } from '../Title'
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary.component'

const Botw = React.lazy(() => import('../pages/Botw'))
const ConnectFour = React.lazy(() => import('../pages/ConnectFour'))
const Home = React.lazy(() => import('../pages/Home'))
const Tools = React.lazy(() => import('../pages/Tools'))
const Login = React.lazy(() => import('../pages/Login'))
const Health = React.lazy(() => import('../pages/Health'))

export const App = ({ screenType, loggedIn }) => (
  <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader slot="header" screentype={ screenType }/>

      { screenType === 'mobile' ? '' : (
        <Sidemenu slot="sidemenu" screentype={ screenType }/>
      ) }

      <main>
        <ErrorBoundary>
          <Suspense fallback={ <></> }>
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
          </Suspense>
        </ErrorBoundary>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? (
      <Sidemenu slot="sidemenu" screentype={ screenType }/>
    ) : '' }
  </>
)
