import { FunctionComponent } from 'preact'
import { Router } from 'preact-router'
import { ActiveRoute } from './ActiveRoute'
import { PageTitle } from './PageTitle'
import { Routing } from './Routing'

export function NestedRoutes(name: string): FunctionComponent
export function NestedRoutes(params: {
  activeRoute: string
  title: string
}): FunctionComponent
export function NestedRoutes(
  arg: string | { activeRoute: string; title: string },
): FunctionComponent {
  let activeRoute: string
  let title: string

  if (typeof arg === 'string') {
    activeRoute = arg
    title = arg
  } else {
    activeRoute = arg.activeRoute
    title = arg.title
  }

  return ({ children }) => (
    <>
      <ActiveRoute>{activeRoute}</ActiveRoute>

      <Routing>
        <PageTitle.Provider title={title}>
          <Router>{children}</Router>
        </PageTitle.Provider>
      </Routing>
    </>
  )
}
