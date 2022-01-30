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

const Health = React.lazy(() => import('./pages/Health'))

export const App: React.FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)

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

              <Route path="/health/*" element={ <>
                <Title title="health"/>
                <SetActiveRoute route="health"/>
                <Health/>
              </> }/>

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
