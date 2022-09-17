import React, { FunctionComponent, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Tools } from '../pages/Tools'
import { selectScreenType } from '../slices/screen'
import { Index } from '../tools/Index'
import { ErrorBoundary } from './ErrorBoundary'
import { PageHeader } from './PageHeader'
import { SideMenu } from './SideMenu'

const Ascii = React.lazy(() => import('../tools/Ascii'))
const Bmi = React.lazy(() => import('../tools/Bmi'))
const Countdown = React.lazy(() => import('../tools/Countdown'))
const DropRates = React.lazy(() => import('../tools/DropRates'))
const Float = React.lazy(() => import('../tools/Float'))
const Html = React.lazy(() => import('../tools/Html'))
const MarkdownViewer = React.lazy(() => import('../tools/MarkdownViewer'))
const Ratings = React.lazy(() => import('../tools/Ratings'))
const Timestamp = React.lazy(() => import('../tools/Timestamp'))

export const App: FunctionComponent = () => {
  const screenType = useSelector(selectScreenType)

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
                <Route path="" element={ <Index/> }/>
                <Route path="ascii" element={ <Ascii/> }/>
                <Route path="bmi" element={ <Bmi/> }/>
                <Route path="countdown" element={ <Countdown/> }/>
                <Route path="drop-rates" element={ <DropRates/> }/>
                <Route path="float" element={ <Float/> }/>
                <Route path="html" element={ <Html/> }/>
                <Route path="markdown-viewer" element={ <MarkdownViewer/> }/>
                <Route path="ratings" element={ <Ratings/> }/>
                <Route path="timestamp" element={ <Timestamp/> }/>
              </Route>
              <Route path="*" element={ <NotFound/> }/>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </rdcl-grid>

    { screenType === 'mobile' && <SideMenu/> }
  </>
}
