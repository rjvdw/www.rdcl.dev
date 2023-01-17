import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { App } from './components/App'
import Activities from './pages/Activities'
import { Home } from './pages/Home'
import { Labels } from './pages/Labels'
import { NotFound } from './pages/NotFound'
import { Session } from './pages/Session'
import Tools from './pages/Tools'

const Login = React.lazy(() => import('./pages/Login'))
const VerifyLogin = React.lazy(() => import('./pages/VerifyLogin'))
const Logout = React.lazy(() => import('./pages/Logout'))

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/session" element={<Session />} />
      <Route path="/labels" element={<Labels />} />
      <Route path="/tools" element={<Tools />}>
        <Route index element={<Tools.Index />} />
        <Route path="ascii" element={<Tools.Ascii />} />
        <Route path="bmi" element={<Tools.Bmi />} />
        <Route path="countdown" element={<Tools.Countdown />} />
        <Route path="drop-rates" element={<Tools.DropRates />} />
        <Route path="float" element={<Tools.Float />} />
        <Route path="markdown-viewer" element={<Tools.MarkdownViewer />} />
        <Route path="ratings" element={<Tools.Ratings />} />
        <Route path="uuid" element={<Tools.UUID />} />
      </Route>
      <Route path="/activities" element={<Activities />}>
        <Route index element={<Activities.Overview />} />
        <Route path=":activityId" element={<Activities.Details />} />
        <Route path="new" element={<Activities.New />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/login/verify" element={<VerifyLogin />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
