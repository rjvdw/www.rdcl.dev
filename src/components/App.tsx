import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { PageHeader } from './PageHeader'
import { Sidemenu } from './Sidemenu'
import { Title } from './Title'
import { Home } from './pages/Home'
import { ErrorBoundary } from './ErrorBoundary'
import { selectScreenType } from '../modules/screen'

export const App: React.FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)

  return <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader/>

      { screenType === 'mobile' ? '' : <Sidemenu/> }

      <main>
        <ErrorBoundary>
          <Suspense fallback={ <rdcl-spinner/> }>
            <Title/>
            <Home/>
          </Suspense>
        </ErrorBoundary>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' ? <Sidemenu/> : '' }
  </>
}
