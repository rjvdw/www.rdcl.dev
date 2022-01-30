import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { PageHeader } from './PageHeader'
import { Sidemenu } from './Sidemenu'
import { Title } from './Title'
import { Home } from './pages/Home'
import { ErrorBoundary } from './ErrorBoundary'
import { selectScreenType } from '../modules/screen'
import Tools from './pages/Tools'
import { SetActiveRoute } from './SetActiveRoute'
import { selectIsLoggedIn } from '../modules/auth'

export const App: React.FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)
  const loggedIn = useSelector(selectIsLoggedIn)

  return <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader/>

      { screenType !== 'mobile' && <Sidemenu/> }

      <main>
        <ErrorBoundary>
          <Suspense fallback={ <rdcl-spinner/> }>
            <Routes>
              <Route path="/" element={ <>
                <Title/>
                <SetActiveRoute route="home"/>
                <Home/>
              </> }/>

              <Route path="/tracker/*" element={
                loggedIn
                  ? <>
                    <Title title="health"/>
                    <h1>Logged in</h1>
                  </>
                  : <>
                    <Title title="log in"/>
                    <h1>Not logged in</h1>
                  </>
              }/>

              <Route path="/tools/*" element={ <>
                <Title title="tools"/>
                <SetActiveRoute route="tools"/>
                <Tools/>
              </> }/>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' && <Sidemenu/> }
  </>
}
