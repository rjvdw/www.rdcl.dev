import { FunctionComponent } from 'preact'
import { Meta } from '../components/Meta.tsx'
import { Routing } from '../components/Routing.tsx'
import Router from 'preact-router'
import { Dummy1 } from '../tools/Dummy1.tsx'
import { Dummy2 } from '../tools/Dummy2.tsx'
import { Dummy3 } from '../tools/Dummy3.tsx'

export const Tools: FunctionComponent = () => (
  <>
    <Meta activeRoute="tools" />

    <Routing>
      <Router>
        <Dummy1 path="/tools/dummy1" />
        <Dummy2 path="/tools/dummy2" />
        <Dummy3 path="/tools/dummy3" />
        <Index default />
      </Router>
    </Routing>
  </>
)

const Index: FunctionComponent = () => (
  <>
    <Meta activeRoute="index" pageTitle="tools" />
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
