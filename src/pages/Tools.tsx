import { FunctionComponent } from 'preact'
import { Router } from 'preact-router'
import { ActiveRoute } from '../components/ActiveRoute.tsx'
import { PageTitle } from '../components/PageTitle.tsx'
import { Routing } from '../components/Routing.tsx'
import { Dummy1 } from '../tools/Dummy1.tsx'
import { Dummy2 } from '../tools/Dummy2.tsx'
import { Dummy3 } from '../tools/Dummy3.tsx'

const ToolsComponent: FunctionComponent = ({ children }) => (
  <>
    <ActiveRoute>tools</ActiveRoute>

    <Routing>
      <PageTitle.Provider title="tools">
        <Router>{children}</Router>
      </PageTitle.Provider>
    </Routing>
  </>
)

const Index: FunctionComponent = () => (
  <>
    <ActiveRoute>index</ActiveRoute>
    <PageTitle />

    <h1>Tools</h1>

    <ul>
      <li>
        <a href="/tools/dummy1">Dummy 1</a>
      </li>
      <li>
        <a href="/tools/dummy2">Dummy 2</a>
      </li>
      <li>
        <a href="/tools/dummy3">Dummy 3</a>
      </li>
    </ul>
  </>
)

export const Tools = Object.assign(ToolsComponent, {
  Index,
  Dummy1,
  Dummy2,
  Dummy3,
})
