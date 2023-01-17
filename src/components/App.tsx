import React, { FunctionComponent, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { selectScreenType } from '../slices/screen'
import { ErrorBoundary } from './ErrorBoundary'
import { Notifications } from './Notifications'
import { PageHeader } from './PageHeader'
import { SideMenu } from './SideMenu'

const HexGrid = React.lazy(() => import('../hex-grid'))

export const App: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)
  const location = useLocation()

  if (location.pathname.startsWith('/hex-grid')) {
    return (
      <>
        <Suspense fallback={<rdcl-spinner />}>
          <HexGrid />
        </Suspense>
      </>
    )
  }

  return (
    <>
      <rdcl-grid screentype={screenType}>
        <PageHeader />

        {screenType !== 'mobile' && <SideMenu />}

        <main>
          <ErrorBoundary>
            <Suspense fallback={<rdcl-spinner />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </rdcl-grid>

      {screenType === 'mobile' && <SideMenu />}

      <Notifications />
    </>
  )
}
