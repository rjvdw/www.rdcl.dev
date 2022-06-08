import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from '../ErrorBoundary'
import { Title } from '../Title'
import { Index } from '../tools/Index'

const Ascii = React.lazy(() => import('../tools/Ascii'))
const Bmi = React.lazy(() => import('../tools/Bmi'))
const Countdown = React.lazy(() => import('../tools/Countdown'))
const DropRates = React.lazy(() => import('../tools/DropRates'))
const Float = React.lazy(() => import('../tools/Float'))
const Html = React.lazy(() => import('../tools/Html'))
const Ratings = React.lazy(() => import('../tools/Ratings'))
const Syncopation = React.lazy(() => import('../tools/Syncopation'))
const Timestamp = React.lazy(() => import('../tools/Timestamp'))

export const Tools = () =>
  <ErrorBoundary>
    <Suspense fallback={ <rdcl-spinner/> }>
      <Routes>
        <Route path="/ascii" element={ <>
          <Title path={ ['ascii', 'tools'] }/>
          <Ascii/>
        </> }/>

        <Route path="/float" element={ <>
          <Title path={ ['float', 'tools'] }/>
          <Float/>
        </> }/>

        <Route path="/html" element={ <>
          <Title path={ ['html elements', 'tools'] }/>
          <Html/>
        </> }/>

        <Route path="/countdown" element={ <>
          <Title path={ ['countdown', 'tools'] }/>
          <Countdown/>
        </> }/>

        <Route path="/drop-rates" element={ <>
          <Title path={ ['drop rates', 'tools'] }/>
          <DropRates/>
        </> }/>

        <Route path="/bmi" element={ <>
          <Title path={ ['bmi', 'tools'] }/>
          <Bmi/>
        </> }/>

        <Route path="/ratings" element={ <>
          <Title path={ ['ratings', 'tools'] }/>
          <Ratings/>
        </> }/>

        <Route path="/syncopation" element={ <>
          <Title path={ ['syncopation', 'tools'] }/>
          <Syncopation/>
        </> }/>

        <Route path="/timestamp" element={ <>
          <Title path={ ['timestamp', 'tools'] }/>
          <Timestamp/>
        </> }/>

        <Route path="*" element={ <>
          <Title title="tools"/>
          <Index/>
        </> }/>
      </Routes>
    </Suspense>
  </ErrorBoundary>

export default Tools
