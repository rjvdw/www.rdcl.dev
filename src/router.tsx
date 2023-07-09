import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { App } from './components/App'
import { Activities } from './pages/Activities'
import { Auth } from './pages/Auth'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import Tools from './pages/Tools'

const Health = React.lazy(() => import('./pages/Health'))
const Labels = React.lazy(() => import('./pages/Labels'))

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />

      {/* tools */}
      <Route path="/tools" element={<Tools />}>
        <Route index element={<Tools.Index />} />
        <Route path="ascii" element={<Tools.Ascii />} />
        <Route path="bmi" element={<Tools.Bmi />} />
        <Route path="countdown" element={<Tools.Countdown />} />
        <Route path="drop-rates" element={<Tools.DropRates />} />
        <Route path="float" element={<Tools.Float />} />
        <Route path="markdown-viewer" element={<Tools.MarkdownViewer />} />
        <Route path="ip" element={<Tools.MyIp />} />
        <Route path="ratings" element={<Tools.Ratings />} />
        <Route path="uuid" element={<Tools.UUID />} />
      </Route>

      {/* auth */}
      <Route path="/login" element={<Auth.Login />} />
      <Route path="/login/verify" element={<Auth.VerifyLogin />} />
      <Route path="/logout" element={<Auth.Logout />} />
      <Route path="/session" element={<Auth.Session />} />
      <Route path="/me" element={<Auth.Profile />} />

      {/* activities */}
      <Route path="/activities" element={<Activities />}>
        <Route index element={<Activities.Overview />} />
        <Route path=":activityId" element={<Activities.Details />} />
        <Route path="new" element={<Activities.New />} />
      </Route>

      {/* labels */}
      <Route path="/labels" element={<Labels />} />

      {/* health */}
      <Route path="/health" element={<Health />} />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)
