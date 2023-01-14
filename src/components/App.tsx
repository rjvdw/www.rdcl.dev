import React, { FunctionComponent, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Activities } from '../pages/Activities'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Tools } from '../pages/Tools'
import { selectScreenType } from '../slices/screen'
import { ErrorBoundary } from './ErrorBoundary'
import { Notifications } from './Notifications'
import { PageHeader } from './PageHeader'
import { SideMenu } from './SideMenu'

const HexGrid = React.lazy(() => import('../hex-grid'))
const Login = React.lazy(() => import('../pages/Login'))
const VerifyLogin = React.lazy(() => import('../pages/VerifyLogin'))
const Logout = React.lazy(() => import('../pages/Logout'))

export const App: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)
  const location = useLocation()

  if (location.pathname.startsWith('/hex-grid')) {
    return <>
      <Suspense fallback={ <rdcl-spinner/> }>
        <HexGrid/>
      </Suspense>
    </>
  }

  return <>
    <rdcl-grid screentype={ screenType }>
      <PageHeader/>

      { screenType !== 'mobile' && <SideMenu/> }

      <main>
        <ErrorBoundary>
          <Suspense fallback={ <rdcl-spinner/> }>
            <Routes>
              <Route path="/" element={ <Home/> }/>
              <Route path="/tools" element={ <Tools/> }>
                <Route index element={ <Tools.Index/> }/>
                <Route path="ascii" element={ <Tools.Ascii/> }/>
                <Route path="bmi" element={ <Tools.Bmi/> }/>
                <Route path="countdown" element={ <Tools.Countdown/> }/>
                <Route path="drop-rates" element={ <Tools.DropRates/> }/>
                <Route path="float" element={ <Tools.Float/> }/>
                <Route path="markdown-viewer" element={ <Tools.MarkdownViewer/> }/>
                <Route path="ratings" element={ <Tools.Ratings/> }/>
                <Route path="uuid" element={ <Tools.UUID/> }/>
              </Route>
              <Route path="/activities" element={ <Activities/> }>
                <Route index element={ <Activities.Index/> }/>
                <Route path=":activityId" element={ <Activities.Details/> }/>
                <Route path="new" element={ <Activities.New/> }/>
              </Route>
              <Route path="/login" element={ <Login/> }/>
              <Route path="/login/verify" element={ <VerifyLogin/> }/>
              <Route path="/logout" element={ <Logout/> }/>
              <Route path="*" element={ <NotFound/> }/>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' && <SideMenu/> }

    <Notifications/>
  </>
}
