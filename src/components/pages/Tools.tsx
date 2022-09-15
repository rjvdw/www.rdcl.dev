import React, { FunctionComponent, Suspense } from 'react'
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
const MarkdownViewer = React.lazy(() => import('../tools/MarkdownViewer'))
const Ratings = React.lazy(() => import('../tools/Ratings'))
const Timestamp = React.lazy(() => import('../tools/Timestamp'))

export const Tools = () =>
  <ErrorBoundary>
    <Suspense fallback={ <rdcl-spinner/> }>
      <Routes>
        <Route path="/ascii" element={ <>
          <ToolsTitle>ascii</ToolsTitle>
          <Ascii/>
        </> }/>

        <Route path="/float" element={ <>
          <ToolsTitle>float</ToolsTitle>
          <Float/>
        </> }/>

        <Route path="/html" element={ <>
          <ToolsTitle>html elements</ToolsTitle>
          <Html/>
        </> }/>

        <Route path="/countdown" element={ <>
          <ToolsTitle>countdown</ToolsTitle>
          <Countdown/>
        </> }/>

        <Route path="/drop-rates" element={ <>
          <ToolsTitle>drop rates</ToolsTitle>
          <DropRates/>
        </> }/>

        <Route path="/bmi" element={ <>
          <ToolsTitle>bmi</ToolsTitle>
          <Bmi/>
        </> }/>

        <Route path="/markdown-viewer" element={ <>
          <ToolsTitle>markdown viewer</ToolsTitle>
          <MarkdownViewer/>
        </> }/>

        <Route path="/ratings" element={ <>
          <ToolsTitle>ratings</ToolsTitle>
          <Ratings/>
        </> }/>

        <Route path="/timestamp" element={ <>
          <ToolsTitle>timestamp</ToolsTitle>
          <Timestamp/>
        </> }/>

        <Route path="*" element={ <>
          <Title>tools</Title>
          <Index/>
        </> }/>
      </Routes>
    </Suspense>
  </ErrorBoundary>

export default Tools

const ToolsTitle: FunctionComponent<{ children: string }> = ({ children }) => (
  <Title>{ [children, 'tools'] }</Title>
)
