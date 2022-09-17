import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { selectScreenType } from '../slices/screen'
import { ActiveRoute } from './ActiveRoute'
import { ErrorBoundary } from './ErrorBoundary'
import { PageHeader } from './PageHeader'
import { SideMenu } from './SideMenu'
import { Title } from './Title'
import { Home } from './pages/Home'
import { Tools } from './pages/Tools'

export const App: React.FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)

  return <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader/>

      { screenType !== 'mobile' && <SideMenu/> }

      <main>
        <ErrorBoundary>
          <Suspense fallback={ <rdcl-spinner/> }>
            <Routes>
              <Route path="/" element={ <>
                <Title/>
                <ActiveRoute>home</ActiveRoute>
                <Home/>
              </> }/>

              <Route path="/tools/*" element={ <>
                <Title>tools</Title>
                <ActiveRoute>tools</ActiveRoute>
                <Tools/>
              </> }/>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' && <SideMenu/> }
  </>
}
