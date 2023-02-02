import React, { FunctionComponent, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectScreenType } from '../slices/screen'
import { ErrorBoundary } from './ErrorBoundary'
import { Notifications } from './Notifications'
import { PageHeader } from './PageHeader'
import { SideMenu } from './SideMenu'

export const App: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)

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
